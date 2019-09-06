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
* [`twilio token:chat`](#twilio-tokenchat)

## `twilio token:chat`

```
USAGE
  $ twilio token:chat

OPTIONS
  -l=(debug|info|warn|error|none)      [default: info] Level of logging messages.
  -o=(columns|json|tsv)                [default: columns] Format of command output.
  -p, --profile=profile                Shorthand identifier for your Twilio profile.
  --chat-service-sid=chat-service-sid  (required) The service SID for the Chat, starts with ISXXX
  --identity=identity                  (required) The user identity for this Chat
  --ttl                                (optional) max 24 hour ttl for token (in seconds)
```

_See code: [src/commands/token/chat.js](https://github.com/twilio-labs/plugin-token/blob/v2.0.0/src/commands/token/chat.js)_

* [`twilio token:video`](#twilio-tokenvideo)

## `twilio token:video`

```
USAGE
  $ twilio token:video

OPTIONS
  -l=(debug|info|warn|error|none)      [default: info] Level of logging messages.
  -o=(columns|json|tsv)                [default: columns] Format of command output.
  -p, --profile=profile                Shorthand identifier for your Twilio profile.
  --room-name                          (not required) The name of the room this token grants access to.
  --identity=identity                  (required) The user identity for this Video room
  --ttl                                (optional) max 24 hour ttl for token (in seconds)
```

_See code: [src/commands/token/video.js](https://github.com/twilio-labs/plugin-token/blob/v2.0.0/src/commands/token/video.js)_

* [`twilio token:voice`](#twilio-tokenvoice)

## `twilio token:voice`

```
USAGE
  $ twilio token:voice

OPTIONS
  -l=(debug|info|warn|error|none)      [default: info] Level of logging messages.
  -o=(columns|json|tsv)                [default: columns] Format of command output.
  -p, --profile=profile                Shorthand identifier for your Twilio profile.
  --voice-app-sid                      (required) The SID for the TwiML APP controlling outbound calls.
  --identity=identity                  (required) The user identity for this Video room
  --allow-incoming                     (not required, defaults to true) Allow incoming calls
  --ttl                                (optional) max 24 hour ttl for token (in seconds)
```

_See code: [src/commands/token/voice.js](https://github.com/twilio-labs/plugin-token/blob/v2.0.0/src/commands/token/voice.js)_

* [`twilio token:flex`](#twilio-tokenflex)

## `twilio token:flex`

```
(V2 TaskRouter)
USAGE
  $ twilio token:flex

OPTIONS
  -l=(debug|info|warn|error|none)      [default: info] Level of logging messages.
  -o=(columns|json|tsv)                [default: columns] Format of command output.
  -p, --profile=profile                Shorthand identifier for your Twilio profile.
  --worker-sid                         (required) TaskRouter Worker SID
  --workspace-sid                      (required) TaskRouter Workspace SID
  --ttl                                (optional) max 24 hour ttl for token (in seconds)
```

_See code: [src/commands/token/capability/flex.js](https://github.com/twilio-labs/plugin-token/blob/v2.0.0/src/commands/token/capability/flex.js)_

##BIG NOTE! Capability tokens can't be generated with an API Key and API Secret. You will only be able to generate these if you have your Account SID and Auth Token stored as environment variables and aren't using profiles. https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html for details on how.

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
