const { flags } = require('@oclif/command');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { TwilioCliError } = require('@twilio/cli-core').services.error;
const Twilio = require('twilio');

class VideoTokenGenerator extends TwilioClientCommand {
  constructor(argv, config, secureStorage) {
    super(argv, config, secureStorage);

    this.showHeaders = true;
  }

  async runCommand() {
    const accessToken = new Twilio.jwt.AccessToken(
      this.twilioClient.accountSid,
      this.twilioClient.username,
      this.twilioClient.password
    );

    let room = this.flags['room-name'];
    let videoGrant = new Twilio.jwt.AccessToken.VideoGrant({ room });
    accessToken.addGrant(videoGrant);
    accessToken.identity = this.flags['identity'];

    this.logger.info('Copy/paste this video token into your test application:');
    this.output({ jwt: accessToken.toJwt() }, undefined, {
      showHeaders: false,
    });
  }
}

const VideoTokenGeneratorFlags = {
  identity: flags.string({
    description: 'The user identity for this Video room',
    required: true,
  }),
  'room-name': flags.string({
    description: 'The name of the room this token grants access to',
    required: false,
  }),
};

VideoTokenGenerator.flags = Object.assign(
  VideoTokenGeneratorFlags,
  TwilioClientCommand.flags
);
module.exports = VideoTokenGenerator;
