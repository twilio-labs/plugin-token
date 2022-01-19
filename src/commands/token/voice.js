const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const Twilio = require('twilio');
const createToken = require('../../helpers/accessToken.js');
const globalFlags = require('../../helpers/globalFlags.js');
const { voiceFlags, validateTwimlAppSid, validatePushCredentialSid } = require('../../helpers/voiceGlobals.js');

class VoiceTokenGenerator extends TwilioClientCommand {
  constructor(argv, config) {
    super(argv, config);

    this.showHeaders = true;
  }

  async run() {
    await super.run();

    const accessToken = createToken.call(this);

    if (!validateTwimlAppSid(this.flags['voice-app-sid'])) {
      this.logger.error(
        'Invalid TwiML Application SID, must look like APxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      );
      process.exit(1);
    }

    let pushCredentialSid = this.flags['push-credential-sid'];
    if (pushCredentialSid && !validatePushCredentialSid(pushCredentialSid)) {
      this.logger.error(
        'Invalid Push Credential SID, must look like CRxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      );
      process.exit(1);
    }

    let incomingAllow = (this.flags['allow-incoming'] == 'true');
    let voiceGrant = new Twilio.jwt.AccessToken.VoiceGrant({
      outgoingApplicationSid: this.flags['voice-app-sid'],
      incomingAllow
    });
    if (pushCredentialSid) {
      voiceGrant.pushCredentialSid = pushCredentialSid;
    }
    accessToken.addGrant(voiceGrant);

    this.logger.info('Copy/paste this voice token into your test application:');
    this.output({ jwt: accessToken.toJwt() }, undefined, {
      showHeaders: false,
    });
  }
}

VoiceTokenGenerator.flags = Object.assign(
  voiceFlags,
  TwilioClientCommand.flags,
  globalFlags,
);
module.exports = VoiceTokenGenerator;
