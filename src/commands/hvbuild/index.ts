import {Flags, Command} from '@oclif/core'
import * as os from "os";
import * as path from "path";
import * as fs from "fs-extra";

import execa = require("execa");

export default class HvBuild extends Command {
  static args = {}

  static summary = 'Build hypervisor application.'

  static description = 'Build hypervisor application starting from a Dockerfile and ending with a snapshot of the corresponding Cartesi Machine already booted and yielded for the first time. This snapshot can be used to start a Cartesi node for the application using `sunodo run`.'

  static examples = [
       "<%= config.bin %> <%= command.id %>",
  ]

  static flags = {
    "from-image-host": Flags.string({
      summary: "start building host fs from this image",
    }),
    "from-image-guest": Flags.string({
      summary: "start building guest fs from this image",
    }),
  }

  private async exportImageTar(
    image: string,
    tarPath: string,
  ) {
    // create container
    const { stdout: cid } = await execa("docker", [
        "container",
        "create",
        "--platform",
        "linux/riscv64",
        image,
    ]);

    // export container rootfs to tar
    await execa("docker", ["export", "-o", tarPath, cid]);

    // remove container
    await execa("docker", ["rm", cid]);
  }

  private async createExt2(
    sdkImage: string,
    tarPath: string,
  ): Promise<string> {
    // extract base name of tar file
    const tarName = path.basename(tarPath, path.extname(tarPath));

    const containerDir = "/mnt";
    const bind = `${path.resolve(path.dirname(tarPath))}:${containerDir}`;
    const tar = path.join(containerDir, tarName + ".tar");
    const ext2 = path.join(containerDir, tarName + ".ext2");

    // su, variables to run container as current user
    const user = os.userInfo();
    const su = [
        "--env",
        `USER=${user.username}`,
        "--env",
        `GROUP=container-group-${user.gid}`,
        "--env",
        `UID=${user.uid}`,
        "--env",
        `GID=${user.gid}`,
    ];

    // re-tar as gnu format, issue with locale
    await execa("docker", [
      "container",
      "run",
      "--rm",
      ...su,
      "--volume",
      bind,
      sdkImage,
      "retar",
      tar,
    ]);

    const blockSize = 4096;

    // generate ext2
    await execa(
      "docker",
      [
          "container",
          "run",
          "--rm",
          "--volume",
          bind,
          sdkImage,
          "genext2fs",
          "--tarball",
          tar,
          "--block-size",
          blockSize.toString(),
          "--faketime",
          "--readjustment",
          "+8k",
          ext2,
      ],
      { stdio: "inherit" },
    );

    const ext2Path = path.join(path.resolve(path.dirname(tarPath)), tarName + ".ext2");
    return ext2Path
  }

  private async createMachineSnapshot(
    sdkImage: string,
    hostExt2Path: string,
    guestExt2Path: string,
  ): Promise<void> {

    const containerDir = "/mnt";

    const guestName = path.basename(guestExt2Path, path.extname(guestExt2Path));
    const guestExt2 = path.join(containerDir, guestName + ".ext2");
    const guestDriveLabel = "guest-root";
    const guestRamSize = "256M"
    const guestLinux = "/hv/linux.bin"
    const guestDisk = "/dev/pmem1"
    const guestInit = [
      "busybox ip link set dev eth0 up",
      "busybox ip addr add 192.168.3.2/24 dev eth0",
    ].join(" && ");

    const hostName = path.basename(hostExt2Path, path.extname(hostExt2Path));
    const hostExt2 = path.join(containerDir, hostName + ".ext2");
    const hostDriveLabel = "root";
    const hostRamSize = "256M"
    const hostInit = [
      "busybox tunctl -t tap0 >/dev/null",
      "busybox ip link set tap0 up",
      "busybox ip addr add 192.168.3.1/24 dev tap0",
    ].join(" && ");
    const hostCmd = [
      `lkvm run`,
      `--loglevel warning`,
      `--mem ${guestRamSize}`,
      `--cpus 1`,
      `--virtio-transport mmio`,
      `--balloon`,
      `--rng`,
      `--console hv`,
      `--network mode=tap,tapif=tap0`,
      `--disk ${guestDisk}`,
      `--kernel ${guestLinux}`,
      `--params 'quiet earlycon=sbi console=hvc0 rw rootfstype=ext2 root=/dev/vda init=/usr/sbin/cartesi-init`,
      `-- ${guestInit}'`
    ].join(" ");

    const absolutePath = path.resolve(path.dirname(hostExt2Path));
    const bind = `${absolutePath}:${containerDir}`;
    const outDir = path.join(containerDir, hostName);

    const envs = [
        "ROLLUP_HTTP_SERVER_URL=http://127.0.0.1:5004",
        "PATH=",
    ]
    const env = envs.join(" ");
    const bootargs = [env, hostCmd].join(" ")
    this.log(bootargs);

    await execa(
      "docker",
      [
        "container",
        "run",
        "--rm",
        "--volume",
        bind,
        sdkImage,
        "cartesi-machine",
        "--assert-rolling-template",
        `--ram-length=${hostRamSize}`,
        "--rollup",
        `--flash-drive=label:${hostDriveLabel},filename:${hostExt2}`,
        `--flash-drive=label:${guestDriveLabel},filename:${guestExt2},mount:false`,
        `--append-init="${hostInit}"`,
        "--final-hash",
        `--store=${outDir}`,
        "--",
        bootargs,
      ],
      { stdio: "inherit" },
    );

    // change image directory permission to 755
    await fs.chmod(path.join(absolutePath, hostName), 0o755);

    this.log("machine snapshot generated successfully")
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(HvBuild)

    const image_host = flags["from-image-host"] || "cartesi/host-fs:dev"
    const image_guest = flags["from-image-guest"] || "cartesi/guest-fs:dev"
    const sdkImage = `sunodo/sdk:devel`;

    await fs.emptyDir(".sunodo");

    console.log("Creating host ext2 drive...")
    const hostTarPath = path.join(".sunodo", `image-host.tar`);
    await this.exportImageTar(image_host, hostTarPath);
    const hostExt2Path = await this.createExt2(sdkImage, hostTarPath);

    console.log("Creating guest ext2 drive...")
    const guestTarPath = path.join(".sunodo", `image-guest.tar`);
    await this.exportImageTar(image_guest, guestTarPath);
    const guestExt2Path = await this.createExt2(sdkImage, guestTarPath);

    await this.createMachineSnapshot(sdkImage, hostExt2Path, guestExt2Path);
  }
}
