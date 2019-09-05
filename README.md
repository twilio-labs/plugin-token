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
$ twilio plugins:install @twilio-labs/plugin-token
$ twilio --help token
USAGE
  $ twilio token
...
```
# Commands
<!-- commands -->
* [`twilio token:access:chat`](#twilio-tokenchat)

## `twilio token:access:chat`

```
USAGE
  $ twilio token:access:chat

OPTIONS
  -l=(debug|info|warn|error|none)      [default: info] Level of logging messages.
  -o=(columns|json|tsv)                [default: columns] Format of command output.
  -p, --profile=profile                Shorthand identifier for your Twilio profile.
  --chat-service-sid=chat-service-sid  (required) The service SID for the Chat, starts with ISXXX
  --identity=identity                  (required) The user identity for this Chat
  --ttl                                (optional) max 24 hour ttl for token (in seconds)
```

_See code: [src/commands/token/access/chat.js](https://github.com/twilio-labs/plugin-token/blob/v2.0.0/src/commands/token/access/chat.js)_

* [`twilio token:access:video`](#twilio-tokenvideo)

## `twilio token:access:video`

```
USAGE
  $ twilio token:access:video

OPTIONS
  -l=(debug|info|warn|error|none)      [default: info] Level of logging messages.
  -o=(columns|json|tsv)                [default: columns] Format of command output.
  -p, --profile=profile                Shorthand identifier for your Twilio profile.
  --room-name                          (not required) The name of the room this token grants access to.
  --identity=identity                  (required) The user identity for this Video room
  --ttl                                (optional) max 24 hour ttl for token (in seconds)
```

_See code: [src/commands/token/access/video.js](https://github.com/twilio-labs/plugin-token/blob/v2.0.0/src/commands/token/access/video.js)_

* [`twilio token:access:voice`](#twilio-tokenvoice)

## `twilio token:access:voice`

```
USAGE
  $ twilio token:access:voice

OPTIONS
  -l=(debug|info|warn|error|none)      [default: info] Level of logging messages.
  -o=(columns|json|tsv)                [default: columns] Format of command output.
  -p, --profile=profile                Shorthand identifier for your Twilio profile.
  --voice-app-sid                      (required) The SID for the TwiML APP controlling outbound calls.
  --identity=identity                  (required) The user identity for this Video room
  --allow-incoming                     (not required, defaults to true) Allow incoming calls
  --ttl                                (optional) max 24 hour ttl for token (in seconds)
```

_See code: [src/commands/token/access/voice.js](https://github.com/twilio-labs/plugin-token/blob/v2.0.0/src/commands/token/access/voice.js)_

* [`twilio token:access:flex`](#twilio-tokenflex)

## `twilio token:access:flex`

```
(V2 TaskRouter)
USAGE
  $ twilio token:access:flex

OPTIONS
  -l=(debug|info|warn|error|none)      [default: info] Level of logging messages.
  -o=(columns|json|tsv)                [default: columns] Format of command output.
  -p, --profile=profile                Shorthand identifier for your Twilio profile.
  --worker-sid                         (required) TaskRouter Worker SID
  --workspace-sid                      (required) TaskRouter Workspace SID
  --ttl                                (optional) max 24 hour ttl for token (in seconds)
```

_See code: [src/commands/token/capability/flex.js](https://github.com/twilio-labs/plugin-token/blob/v2.0.0/src/commands/token/capability/flex.js)_

* [`twilio token:capability:client`](#twilio-tokenclient)

## `twilio token:capability:client`

```
Old style client capability token
USAGE
  $ twilio token:capability:client

OPTIONS
  -l=(debug|info|warn|error|none)      [default: info] Level of logging messages.
  -o=(columns|json|tsv)                [default: columns] Format of command output.
  -p, --profile=profile                Shorthand identifier for your Twilio profile.
  --voice-app-sid                      (required) The SID for the TwiML APP controlling outbound calls.
  --identity=identity                  (required) The user identity for this Video room
  --allow-incoming                     (not required, defaults to true) Allow incoming calls
  --ttl                                (optional) max 24 hour ttl for token (in seconds)
```

_See code: [src/commands/token/capability/client.js](https://github.com/twilio-labs/plugin-token/blob/v2.0.0/src/commands/token/capability/client.js)_

* [`twilio token:capability:worker`](#twilio-tokenworker)

## `twilio token:capability:worker`

```
Old style client capability token
USAGE
  $ twilio token:capability:client

OPTIONS
  -l=(debug|info|warn|error|none)      [default: info] Level of logging messages.
  -o=(columns|json|tsv)                [default: columns] Format of command output.
  -p, --profile=profile                Shorthand identifier for your Twilio profile.
  --worker-sid                         (required) TaskRouter Worker SID
  --workspace-sid                      (required) TaskRouter Workspace SID
  --ttl                                (optional) max 24 hour ttl for token (in seconds)
```

_See code: [src/commands/token/capability/worker.js](https://github.com/twilio-labs/plugin-token/blob/v2.0.0/src/commands/token/capability/worker.js)_
<!-- commandsstop -->
#  Contributing

This project welcomes contributions from the community. Please see the [`CONTRIBUTING.md`](CONTRIBUTING.md) file for more details.

## Code of Conduct

Please be aware that this project has a [Code of Conduct](https://github.com/twilio-labs/.github/blob/master/CODE_OF_CONDUCT.md). The tldr; is to just be excellent to each other ❤️

# License

MIT
