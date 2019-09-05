const { flags } = require('@oclif/command');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { TwilioCliError } = require('@twilio/cli-core').services.error;
const Twilio = require('twilio');
const createToken = require('../../../helpers/accessToken.js');
const globalFlags = require('../../../helpers/globalFlags.js');
const { voiceFlags, validateTwimlAppSid } = require('../../../helpers/voiceGlobals.js');

class VoiceTokenGenerator extends TwilioClientCommand {
  constructor(argv, config, secureStorage) {
    super(argv, config, secureStorage);

    this.showHeaders = true;
  }

  async runCommand() {
    const accessToken = createToken.call(this);

    if (!validateTwimlAppSid(this.flags['voice-app-sid'])) {
      this.logger.error(
        'Invalid TwiML Application SID, must look like APxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      );
      process.exit(1);
    }

    let incomingAllow = (this.flags['allow-incoming'] == 'true');
    let voiceGrant = new Twilio.jwt.AccessToken.VoiceGrant({
      outgoingApplicationSid: this.flags['voice-app-sid'],
      incomingAllow
    });
    accessToken.addGrant(voiceGrant);

    this.logger.info('Copy/paste this voice token into your test application:');
    this.output({ jwt: accessToken.toJwt() }, undefined, {
      showHeaders: false,
    });
  }
}

VoiceTokenGenerator.flags = Object.assign(
  TwilioClientCommand.flags,
  globalFlags,
  voiceFlags
);
module.exports = VoiceTokenGenerator;
