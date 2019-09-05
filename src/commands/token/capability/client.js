const { flags } = require('@oclif/command');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { TwilioCliError } = require('@twilio/cli-core').services.error;
const ClientCapability = require('twilio').jwt.ClientCapability;
const globalFlags = require('../../../helpers/globalFlags.js');
const { voiceFlags, validateTwimlAppSid } = require('../../../helpers/voiceGlobals.js');

class ClientCapabilityTokenGenerator extends TwilioClientCommand {
  constructor(argv, config, secureStorage) {
    super(argv, config, secureStorage);

    this.showHeaders = true;
  }

  async runCommand() {
    let ttl = this.flags['ttl'];
    const capability = new ClientCapability({
      accountSid: this.twilioClient.accountSid,
      authToken: this.twilioClient.password,
      ttl
    });

    if (!validateTwimlAppSid(this.flags['voice-app-sid'])) {
      this.logger.error(
        'Invalid TwiML Application SID, must look like APxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      );
      process.exit(1);
    }

    capability.addScope(new ClientCapability.OutgoingClientScope({
      applicationSid: this.flags['voice-app-sid']
    }))

    let incomingAllow = (this.flags['allow-incoming'] == 'true');
    if (incomingAllow) {
      capability.addScope(new ClientCapability.IncomingClientScope(this.flags['identity']))
    }

    this.logger.info('Copy/paste this voice token into your test application:');
    this.output({ jwt: capability.toJwt() }, undefined, {
      showHeaders: false,
    });
  }
}

ClientCapabilityTokenGenerator.flags = Object.assign(
  TwilioClientCommand.flags,
  globalFlags,
  voiceFlags
);
module.exports = ClientCapabilityTokenGenerator;
