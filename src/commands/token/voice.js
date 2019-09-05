const { flags } = require('@oclif/command');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { TwilioCliError } = require('@twilio/cli-core').services.error;
const Twilio = require('twilio');

class VoiceTokenGenerator extends TwilioClientCommand {
  constructor(argv, config, secureStorage) {
    super(argv, config, secureStorage);

    this.showHeaders = true;
  }

  validateTwimlAppSid() {
    return (
      this.flags['voice-app-sid'].startsWith('AP') &&
      this.flags['voice-app-sid'].length === 34
    );
  }

  async runCommand() {
    const accessToken = new Twilio.jwt.AccessToken(
      this.twilioClient.accountSid,
      this.twilioClient.username,
      this.twilioClient.password
    );

    if (!this.validateTwimlAppSid()) {
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
    accessToken.identity = this.flags['identity'];

    this.logger.info('Copy/paste this voice token into your test application:');
    this.output({ jwt: accessToken.toJwt() }, undefined, {
      showHeaders: false,
    });
  }
}

const VoiceTokenGeneratorFlags = {
  identity: flags.string({
    description: 'The user identity for this Voice Client',
    required: true,
  }),
  'voice-app-sid': flags.string({
    description: 'The TwiML Application SID for outbound calls, starts with APXXX',
    required: true,
  }),
  'allow-incoming': flags.string({
    description: 'Allow incoming calls (true/false) (defaults to true)',
    options: ['true', 'false'],
    default: 'true',
    required: false
  })
};

VoiceTokenGenerator.flags = Object.assign(
  VoiceTokenGeneratorFlags,
  TwilioClientCommand.flags
);
module.exports = VoiceTokenGenerator;
