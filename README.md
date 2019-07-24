@twilio/plugin-token
========================

Generate a temporary token for use in a Twilio client-side SDK application

<!-- toc -->
* [Requirements](#requirements)
* [Usage](#usage)
* [Commands](#commands)
* [ Contributing](#contributing)
* [License](#license)
<!-- tocstop -->
# Requirements

## Setup

Head over to the [twilio-cli documentation](https://www.twilio.com/docs/twilio-cli/quickstart).

# Usage

```sh-session
$ twilio plugins:install @twilio-labs/plugin-serverless
$ twilio --help serverless
USAGE
  $ twilio serverless
...
```
# Commands
<!-- commands -->
* [`twilio token:chat`](#twilio-tokenchat)

## `twilio token:chat`

```
USAGE
  $ twilio token:chat

OPTIONS
  -l=(debug|info|warn|error|none)      [default: info] Level of logging messages.
  -o=(columns|json|tsv)                [default: columns] Format of command output.
  -p, --project=project                Shorthand identifier for your Twilio project.
  --chat-service-sid=chat-service-sid  (required) The service SID for the Chat, starts with ISXXX
  --identity=identity                  (required) The user identity for this Chat
```

_See code: [src/commands/token/chat.js](https://github.com/twilio/plugin-token/blob/v1.0.1/src/commands/token/chat.js)_
<!-- commandsstop -->
#  Contributing

This project welcomes contributions from the community. Please see the [`CONTRIBUTING.md`](CONTRIBUTING.md) file for more details.

## Code of Conduct

Please be aware that this project has a [Code of Conduct](https://github.com/twilio-labs/.github/blob/master/CODE_OF_CONDUCT.md). The tldr; is to just be excellent to each other ❤️

# License

MIT
