oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g hypervisor-sunodo-plugin
$ hypervisor-sunodo-plugin COMMAND
running command...
$ hypervisor-sunodo-plugin (--version)
hypervisor-sunodo-plugin/0.0.0 darwin-arm64 node-v21.4.0
$ hypervisor-sunodo-plugin --help [COMMAND]
USAGE
  $ hypervisor-sunodo-plugin COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`hypervisor-sunodo-plugin hello PERSON`](#hypervisor-sunodo-plugin-hello-person)
* [`hypervisor-sunodo-plugin hello world`](#hypervisor-sunodo-plugin-hello-world)
* [`hypervisor-sunodo-plugin help [COMMANDS]`](#hypervisor-sunodo-plugin-help-commands)
* [`hypervisor-sunodo-plugin plugins`](#hypervisor-sunodo-plugin-plugins)
* [`hypervisor-sunodo-plugin plugins:install PLUGIN...`](#hypervisor-sunodo-plugin-pluginsinstall-plugin)
* [`hypervisor-sunodo-plugin plugins:inspect PLUGIN...`](#hypervisor-sunodo-plugin-pluginsinspect-plugin)
* [`hypervisor-sunodo-plugin plugins:install PLUGIN...`](#hypervisor-sunodo-plugin-pluginsinstall-plugin-1)
* [`hypervisor-sunodo-plugin plugins:link PLUGIN`](#hypervisor-sunodo-plugin-pluginslink-plugin)
* [`hypervisor-sunodo-plugin plugins:uninstall PLUGIN...`](#hypervisor-sunodo-plugin-pluginsuninstall-plugin)
* [`hypervisor-sunodo-plugin plugins reset`](#hypervisor-sunodo-plugin-plugins-reset)
* [`hypervisor-sunodo-plugin plugins:uninstall PLUGIN...`](#hypervisor-sunodo-plugin-pluginsuninstall-plugin-1)
* [`hypervisor-sunodo-plugin plugins:uninstall PLUGIN...`](#hypervisor-sunodo-plugin-pluginsuninstall-plugin-2)
* [`hypervisor-sunodo-plugin plugins update`](#hypervisor-sunodo-plugin-plugins-update)

## `hypervisor-sunodo-plugin hello PERSON`

Say hello

```
USAGE
  $ hypervisor-sunodo-plugin hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/cartesi/hypervisor-sunodo-plugin/blob/v0.0.0/src/commands/hello/index.ts)_

## `hypervisor-sunodo-plugin hello world`

Say hello world

```
USAGE
  $ hypervisor-sunodo-plugin hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ hypervisor-sunodo-plugin hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/cartesi/hypervisor-sunodo-plugin/blob/v0.0.0/src/commands/hello/world.ts)_

## `hypervisor-sunodo-plugin help [COMMANDS]`

Display help for hypervisor-sunodo-plugin.

```
USAGE
  $ hypervisor-sunodo-plugin help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for hypervisor-sunodo-plugin.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.0.7/src/commands/help.ts)_

## `hypervisor-sunodo-plugin plugins`

List installed plugins.

```
USAGE
  $ hypervisor-sunodo-plugin plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ hypervisor-sunodo-plugin plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.10/src/commands/plugins/index.ts)_

## `hypervisor-sunodo-plugin plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ hypervisor-sunodo-plugin plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ hypervisor-sunodo-plugin plugins add

EXAMPLES
  $ hypervisor-sunodo-plugin plugins add myplugin 

  $ hypervisor-sunodo-plugin plugins add https://github.com/someuser/someplugin

  $ hypervisor-sunodo-plugin plugins add someuser/someplugin
```

## `hypervisor-sunodo-plugin plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ hypervisor-sunodo-plugin plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ hypervisor-sunodo-plugin plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.10/src/commands/plugins/inspect.ts)_

## `hypervisor-sunodo-plugin plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ hypervisor-sunodo-plugin plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ hypervisor-sunodo-plugin plugins add

EXAMPLES
  $ hypervisor-sunodo-plugin plugins install myplugin 

  $ hypervisor-sunodo-plugin plugins install https://github.com/someuser/someplugin

  $ hypervisor-sunodo-plugin plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.10/src/commands/plugins/install.ts)_

## `hypervisor-sunodo-plugin plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ hypervisor-sunodo-plugin plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help      Show CLI help.
  -v, --verbose
  --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ hypervisor-sunodo-plugin plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.10/src/commands/plugins/link.ts)_

## `hypervisor-sunodo-plugin plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ hypervisor-sunodo-plugin plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ hypervisor-sunodo-plugin plugins unlink
  $ hypervisor-sunodo-plugin plugins remove

EXAMPLES
  $ hypervisor-sunodo-plugin plugins remove myplugin
```

## `hypervisor-sunodo-plugin plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ hypervisor-sunodo-plugin plugins reset
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.10/src/commands/plugins/reset.ts)_

## `hypervisor-sunodo-plugin plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ hypervisor-sunodo-plugin plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ hypervisor-sunodo-plugin plugins unlink
  $ hypervisor-sunodo-plugin plugins remove

EXAMPLES
  $ hypervisor-sunodo-plugin plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.10/src/commands/plugins/uninstall.ts)_

## `hypervisor-sunodo-plugin plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ hypervisor-sunodo-plugin plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ hypervisor-sunodo-plugin plugins unlink
  $ hypervisor-sunodo-plugin plugins remove

EXAMPLES
  $ hypervisor-sunodo-plugin plugins unlink myplugin
```

## `hypervisor-sunodo-plugin plugins update`

Update installed plugins.

```
USAGE
  $ hypervisor-sunodo-plugin plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.10/src/commands/plugins/update.ts)_
<!-- commandsstop -->
