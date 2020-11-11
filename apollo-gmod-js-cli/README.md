apollo-gmod-js-cli
==================

JavaScript client that interacts with GMOD/Apollo3Server, which annotates genomic data.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/apollo-gmod-js-cli.svg)](https://npmjs.org/package/apollo-gmod-js-cli)
[![Downloads/week](https://img.shields.io/npm/dw/apollo-gmod-js-cli.svg)](https://npmjs.org/package/apollo-gmod-js-cli)
[![License](https://img.shields.io/npm/l/apollo-gmod-js-cli.svg)](https://github.com/GMOD/apollo-gmod-js/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g apollo-gmod-js-cli
$ apollo-gmod-js-cli COMMAND
running command...
$ apollo-gmod-js-cli (-v|--version|version)
apollo-gmod-js-cli/0.0.0 darwin-x64 node-v12.16.1
$ apollo-gmod-js-cli --help [COMMAND]
USAGE
  $ apollo-gmod-js-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`apollo-gmod-js-cli hello [FILE]`](#apollo-gmod-js-cli-hello-file)
* [`apollo-gmod-js-cli help [COMMAND]`](#apollo-gmod-js-cli-help-command)

## `apollo-gmod-js-cli hello [FILE]`

describe the command here

```
USAGE
  $ apollo-gmod-js-cli hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ apollo-gmod-js-cli hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/GMOD/apollo-gmod-js/blob/v0.0.0/src/commands/hello.ts)_

## `apollo-gmod-js-cli help [COMMAND]`

display help for apollo-gmod-js-cli

```
USAGE
  $ apollo-gmod-js-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
