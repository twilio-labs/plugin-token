const { flags } = require('@oclif/command');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { TwilioCliError } = require('@twilio/cli-core').services.error;
const Twilio = require('twilio');
const createToken = require('../../../helpers/accessToken.js');
const globalFlags = require('../../../helpers/globalFlags.js');
const { taskrouterFlags, validateWorkerSid, validateWorkspaceSid } = require('../../../helpers/taskrouterGlobals.js');

class FlexTokenGenerator extends TwilioClientCommand {
  constructor(argv, config, secureStorage) {
    super(argv, config, secureStorage);

    this.showHeaders = true;
  }

  async runCommand() {
    const accessToken = createToken.call(this);

    if (!validateWorkerSid(this.flags['worker-sid'])) {
      this.logger.error(
        'Invalid Worker SID, must look like WKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      );
      process.exit(1);
    }

    if (!validateWorkspaceSid(this.flags['workspace-sid'])) {
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

let globals = {...globalFlags};
delete globals.identity;

FlexTokenGenerator.flags = Object.assign(
  taskrouterFlags,
  TwilioClientCommand.flags,
  globals,
);
module.exports = FlexTokenGenerator;
