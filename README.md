@twilio/plugin-token
========================

Generate a temporary token for use in a Twilio client-side SDK application

<!-- toc -->
* [Requirements](#requirements)
* [Usage](#usage)
* [Commands](#commands)
* [ Contributing](#-contributing)
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
* [`twilio token:sync`](#twilio-tokensync)
* [`twilio token:video`](#twilio-tokenvideo)
* [`twilio token:voice`](#twilio-tokenvoice)

## `twilio token:capability:client`

```
USAGE
  $ twilio token:capability:client --voice-app-sid <value> --identity <value> [-l (debug|info|warn|error|none)] [-o
    (columns|json|tsv|none)] [--silent] [-p <value>] [--allow-incoming true|false] [--push-credential-sid <value>]
    [--ttl <value>]

FLAGS
  -l=(debug|info|warn|error|none)    [default: info] Level of logging messages.
  -o=(columns|json|tsv|none)         [default: columns] Format of command output.
  -p, --profile=<value>              Shorthand identifier for your profile.
      --allow-incoming=<option>      [default: true] Allow incoming calls (true/false) (defaults to true)
                                     <options: true|false>
      --identity=<value>             (required) The user identity
      --push-credential-sid=<value>  The Push Credential SID for receiving incoming call push notifications, starts with
                                     CRXXX
      --silent                       Suppress  output and logs. This is a shorthand for "-l none -o none".
      --ttl=<value>                  Optional TTL for token (up to 24 hours) (value in seconds)
      --voice-app-sid=<value>        (required) The TwiML Application SID for outbound calls, starts with APXXX
```

_See code: [src/commands/token/capability/client.js](https://github.com/twilio-labs/plugin-token/blob/v6.0.0/src/commands/token/capability/client.js)_

## `twilio token:capability:worker`

```
USAGE
  $ twilio token:capability:worker --worker-sid <value> --workspace-sid <value> [-l (debug|info|warn|error|none)] [-o
    (columns|json|tsv|none)] [--silent] [-p <value>] [--ttl <value>]

FLAGS
  -l=(debug|info|warn|error|none)  [default: info] Level of logging messages.
  -o=(columns|json|tsv|none)       [default: columns] Format of command output.
  -p, --profile=<value>            Shorthand identifier for your profile.
      --silent                     Suppress  output and logs. This is a shorthand for "-l none -o none".
      --ttl=<value>                Optional TTL for token (up to 24 hours) (value in seconds)
      --worker-sid=<value>         (required) The Worker SID for this token
      --workspace-sid=<value>      (required) The Workspace SID for this token
```

_See code: [src/commands/token/capability/worker.js](https://github.com/twilio-labs/plugin-token/blob/v6.0.0/src/commands/token/capability/worker.js)_

## `twilio token:chat`

```
USAGE
  $ twilio token:chat --identity <value> --chat-service-sid <value> [-l (debug|info|warn|error|none)] [-o
    (columns|json|tsv|none)] [--silent] [-p <value>] [--ttl <value>]

FLAGS
  -l=(debug|info|warn|error|none)  [default: info] Level of logging messages.
  -o=(columns|json|tsv|none)       [default: columns] Format of command output.
  -p, --profile=<value>            Shorthand identifier for your profile.
      --chat-service-sid=<value>   (required) The service SID for the Chat, starts with ISXXX
      --identity=<value>           (required) The user identity
      --silent                     Suppress  output and logs. This is a shorthand for "-l none -o none".
      --ttl=<value>                Optional TTL for token (up to 24 hours) (value in seconds)
```

_See code: [src/commands/token/chat.js](https://github.com/twilio-labs/plugin-token/blob/v6.0.0/src/commands/token/chat.js)_

## `twilio token:flex`

```
USAGE
  $ twilio token:flex --worker-sid <value> --workspace-sid <value> [-l (debug|info|warn|error|none)] [-o
    (columns|json|tsv|none)] [--silent] [-p <value>] [--ttl <value>]

FLAGS
  -l=(debug|info|warn|error|none)  [default: info] Level of logging messages.
  -o=(columns|json|tsv|none)       [default: columns] Format of command output.
  -p, --profile=<value>            Shorthand identifier for your profile.
      --silent                     Suppress  output and logs. This is a shorthand for "-l none -o none".
      --ttl=<value>                Optional TTL for token (up to 24 hours) (value in seconds)
      --worker-sid=<value>         (required) The Worker SID for this token
      --workspace-sid=<value>      (required) The Workspace SID for this token
```

_See code: [src/commands/token/flex.js](https://github.com/twilio-labs/plugin-token/blob/v6.0.0/src/commands/token/flex.js)_

## `twilio token:sync`

```
USAGE
  $ twilio token:sync --identity <value> --sync-service-sid <value> [-l (debug|info|warn|error|none)] [-o
    (columns|json|tsv|none)] [--silent] [-p <value>] [--ttl <value>]

FLAGS
  -l=(debug|info|warn|error|none)  [default: info] Level of logging messages.
  -o=(columns|json|tsv|none)       [default: columns] Format of command output.
  -p, --profile=<value>            Shorthand identifier for your profile.
      --identity=<value>           (required) The user identity
      --silent                     Suppress  output and logs. This is a shorthand for "-l none -o none".
      --sync-service-sid=<value>   (required) The service SID for the Sync, starts with ISXXX
      --ttl=<value>                Optional TTL for token (up to 24 hours) (value in seconds)
```

_See code: [src/commands/token/sync.js](https://github.com/twilio-labs/plugin-token/blob/v6.0.0/src/commands/token/sync.js)_

## `twilio token:video`

```
USAGE
  $ twilio token:video --identity <value> [-l (debug|info|warn|error|none)] [-o (columns|json|tsv|none)]
    [--silent] [-p <value>] [--room-name <value>] [--ttl <value>]

FLAGS
  -l=(debug|info|warn|error|none)  [default: info] Level of logging messages.
  -o=(columns|json|tsv|none)       [default: columns] Format of command output.
  -p, --profile=<value>            Shorthand identifier for your profile.
      --identity=<value>           (required) The user identity
      --room-name=<value>          The name of the room this token grants access to
      --silent                     Suppress  output and logs. This is a shorthand for "-l none -o none".
      --ttl=<value>                Optional TTL for token (up to 24 hours) (value in seconds)
```

_See code: [src/commands/token/video.js](https://github.com/twilio-labs/plugin-token/blob/v6.0.0/src/commands/token/video.js)_

## `twilio token:voice`

```
USAGE
  $ twilio token:voice --voice-app-sid <value> --identity <value> [-l (debug|info|warn|error|none)] [-o
    (columns|json|tsv|none)] [--silent] [-p <value>] [--allow-incoming true|false] [--push-credential-sid <value>]
    [--ttl <value>]

FLAGS
  -l=(debug|info|warn|error|none)    [default: info] Level of logging messages.
  -o=(columns|json|tsv|none)         [default: columns] Format of command output.
  -p, --profile=<value>              Shorthand identifier for your profile.
      --allow-incoming=<option>      [default: true] Allow incoming calls (true/false) (defaults to true)
                                     <options: true|false>
      --identity=<value>             (required) The user identity
      --push-credential-sid=<value>  The Push Credential SID for receiving incoming call push notifications, starts with
                                     CRXXX
      --silent                       Suppress  output and logs. This is a shorthand for "-l none -o none".
      --ttl=<value>                  Optional TTL for token (up to 24 hours) (value in seconds)
      --voice-app-sid=<value>        (required) The TwiML Application SID for outbound calls, starts with APXXX
```

_See code: [src/commands/token/voice.js](https://github.com/twilio-labs/plugin-token/blob/v6.0.0/src/commands/token/voice.js)_
<!-- commandsstop -->
#  Contributing

This project welcomes contributions from the community. Please see the [`CONTRIBUTING.md`](CONTRIBUTING.md) file for more details.

## Code of Conduct

Please be aware that this project has a [Code of Conduct](https://github.com/twilio-labs/.github/blob/master/CODE_OF_CONDUCT.md). The tldr; is to just be excellent to each other ❤️

# License

MIT
