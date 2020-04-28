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
* [`twilio token:capability:client`](#twilio-tokencapabilityclient)
* [`twilio token:capability:worker`](#twilio-tokencapabilityworker)
* [`twilio token:chat`](#twilio-tokenchat)
* [`twilio token:flex`](#twilio-tokenflex)
* [`twilio token:video`](#twilio-tokenvideo)
* [`twilio token:voice`](#twilio-tokenvoice)

## `twilio token:capability:client`

```
USAGE
  $ twilio token:capability:client

OPTIONS
  -l=(debug|info|warn|error|none)            [default: info] Level of logging messages.
  -o=(columns|json|tsv)                      [default: columns] Format of command output.
  -p, --profile=profile                      Shorthand identifier for your profile.
  --allow-incoming=true|false                [default: true] Allow incoming calls (true/false) (defaults to true)
  --identity=identity                        (required) The user identity

  --push-credential-sid=push-credential-sid  The Push Credential SID for receiving incoming call push notifications,
                                             starts with CRXXX

  --ttl=ttl                                  Optional TTL for token (up to 24 hours) (value in seconds)

  --voice-app-sid=voice-app-sid              (required) The TwiML Application SID for outbound calls, starts with APXXX
```

_See code: [src/commands/token/capability/client.js](https://github.com/twilio-labs/plugin-token/blob/v3.1.2/src/commands/token/capability/client.js)_

## `twilio token:capability:worker`

```
USAGE
  $ twilio token:capability:worker

OPTIONS
  -l=(debug|info|warn|error|none)  [default: info] Level of logging messages.
  -o=(columns|json|tsv)            [default: columns] Format of command output.
  -p, --profile=profile            Shorthand identifier for your profile.
  --ttl=ttl                        Optional TTL for token (up to 24 hours) (value in seconds)
  --worker-sid=worker-sid          (required) The Worker SID for this token
  --workspace-sid=workspace-sid    (required) The Workspace SID for this token
```

_See code: [src/commands/token/capability/worker.js](https://github.com/twilio-labs/plugin-token/blob/v3.1.2/src/commands/token/capability/worker.js)_

## `twilio token:chat`

```
USAGE
  $ twilio token:chat

OPTIONS
  -l=(debug|info|warn|error|none)      [default: info] Level of logging messages.
  -o=(columns|json|tsv)                [default: columns] Format of command output.
  -p, --profile=profile                Shorthand identifier for your profile.
  --chat-service-sid=chat-service-sid  (required) The service SID for the Chat, starts with ISXXX
  --identity=identity                  (required) The user identity
  --ttl=ttl                            Optional TTL for token (up to 24 hours) (value in seconds)
```

_See code: [src/commands/token/chat.js](https://github.com/twilio-labs/plugin-token/blob/v3.1.2/src/commands/token/chat.js)_

## `twilio token:flex`

```
USAGE
  $ twilio token:flex

OPTIONS
  -l=(debug|info|warn|error|none)  [default: info] Level of logging messages.
  -o=(columns|json|tsv)            [default: columns] Format of command output.
  -p, --profile=profile            Shorthand identifier for your profile.
  --ttl=ttl                        Optional TTL for token (up to 24 hours) (value in seconds)
  --worker-sid=worker-sid          (required) The Worker SID for this token
  --workspace-sid=workspace-sid    (required) The Workspace SID for this token
```

_See code: [src/commands/token/flex.js](https://github.com/twilio-labs/plugin-token/blob/v3.1.2/src/commands/token/flex.js)_

## `twilio token:video`

```
USAGE
  $ twilio token:video

OPTIONS
  -l=(debug|info|warn|error|none)  [default: info] Level of logging messages.
  -o=(columns|json|tsv)            [default: columns] Format of command output.
  -p, --profile=profile            Shorthand identifier for your profile.
  --identity=identity              (required) The user identity
  --room-name=room-name            The name of the room this token grants access to
  --ttl=ttl                        Optional TTL for token (up to 24 hours) (value in seconds)
```

_See code: [src/commands/token/video.js](https://github.com/twilio-labs/plugin-token/blob/v3.1.2/src/commands/token/video.js)_

## `twilio token:voice`

```
USAGE
  $ twilio token:voice

OPTIONS
  -l=(debug|info|warn|error|none)            [default: info] Level of logging messages.
  -o=(columns|json|tsv)                      [default: columns] Format of command output.
  -p, --profile=profile                      Shorthand identifier for your profile.
  --allow-incoming=true|false                [default: true] Allow incoming calls (true/false) (defaults to true)
  --identity=identity                        (required) The user identity

  --push-credential-sid=push-credential-sid  The Push Credential SID for receiving incoming call push notifications,
                                             starts with CRXXX

  --ttl=ttl                                  Optional TTL for token (up to 24 hours) (value in seconds)

  --voice-app-sid=voice-app-sid              (required) The TwiML Application SID for outbound calls, starts with APXXX
```

_See code: [src/commands/token/voice.js](https://github.com/twilio-labs/plugin-token/blob/v3.1.2/src/commands/token/voice.js)_
<!-- commandsstop -->
#  Contributing

This project welcomes contributions from the community. Please see the [`CONTRIBUTING.md`](CONTRIBUTING.md) file for more details.

## Code of Conduct

Please be aware that this project has a [Code of Conduct](https://github.com/twilio-labs/.github/blob/master/CODE_OF_CONDUCT.md). The tldr; is to just be excellent to each other ❤️

# License

MIT
