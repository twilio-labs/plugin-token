@twilio/plugin-token
========================

Generate a temporary token for use in a Twilio client-side SDK application

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
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
* [`twilio debugger:logs:list`](#twilio-debuggerlogslist)

## `twilio debugger:logs:list`

Show a list of log events generated for the account

```
USAGE
  $ twilio debugger:logs:list

OPTIONS
  -l=(debug|info|warn|error|none)           [default: info] Level of logging messages.
  -o=(columns|json|tsv)                     [default: columns] Format of command output.
  -p, --project=project                     Shorthand identifier for your Twilio project.
  -s, --streaming                           Continuously stream incoming log events
  --end-date=end-date                       Only show log events on or before this date
  --log-level=(error|warning|notice|debug)  Only show log events for this log level

  --properties=properties                   [default: dateCreated, logLevel, errorCode, alertText] The event properties
                                            you would like to display (JSON output always shows all properties)

  --start-date=start-date                   Only show log events on or after this date

DESCRIPTION
  Argg, this is only a subset of the log events and live tailing isn't quite ready! Think this is a killer feature? Let 
  us know here: https://bit.ly/twilio-cli-feedback
```

_See code: [src/commands/debugger/logs/list.js](https://github.com/twilio/plugin-debugger/blob/v1.1.4/src/commands/debugger/logs/list.js)_
<!-- commandsstop -->
#  Contributing

This project welcomes contributions from the community. Please see the [`CONTRIBUTING.md`](CONTRIBUTING.md) file for more details.

## Code of Conduct

Please be aware that this project has a [Code of Conduct](https://github.com/twilio-labs/.github/blob/master/CODE_OF_CONDUCT.md). The tldr; is to just be excellent to each other ❤️

# License

MIT
