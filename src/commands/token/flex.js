const { flags } = require('@oclif/command');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { TwilioCliError } = require('@twilio/cli-core').services.error;
const Twilio = require('twilio');
const createToken = require('../../helpers/accessToken.js');
const globalFlags = require('../../helpers/globalFlags.js');

class FlexTokenGenerator extends TwilioClientCommand {
  constructor(argv, config, secureStorage) {
    super(argv, config, secureStorage);

    this.showHeaders = true;
  }

  validateWorkerSid() {
    return (
      this.flags['worker-sid'].startsWith('WK') &&
      this.flags['worker-sid'].length === 34
    );
  }

  validateWorkspaceSid() {
    return (
      this.flags['workspace-sid'].startsWith('WS') &&
      this.flags['workspace-sid'].length === 34
    );
  }

  async runCommand() {
    const accessToken = createToken.call(this);

    if (!this.validateWorkerSid()) {
      this.logger.error(
        'Invalid Worker SID, must look like WKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      );
      process.exit(1);
    }

    if (!this.validateWorkspaceSid()) {
      this.logger.error(
        'Invalid Workspace SID, must look like WSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      );
      process.exit(1);
    }

    let flexGrant = new Twilio.jwt.AccessToken.TaskRouterGrant({
      workerSid: this.flags['worker-sid'],
      workspaceSid: this.flags['workspace-sid'],
      role: 'worker'
    });
    accessToken.addGrant(flexGrant);

    this.logger.info('Copy/paste this video token into your test application:');
    this.output({ jwt: accessToken.toJwt() }, undefined, {
      showHeaders: false,
    });
  }
}

const FlexTokenGeneratorFlags = {
  'worker-sid': flags.string({
    description: 'The Worker SID for this token',
    required: true,
  }),
  'workspace-sid': flags.string({
    description: 'The Workspace SID for this token',
    required: true,
  })
};

delete globalFlags['identity'];

FlexTokenGenerator.flags = Object.assign(
  FlexTokenGeneratorFlags,
  TwilioClientCommand.flags,
  globalFlags
);
module.exports = FlexTokenGenerator;
