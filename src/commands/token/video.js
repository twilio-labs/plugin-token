const { flags } = require('@oclif/command');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const Twilio = require('twilio');
const createToken = require('../../helpers/accessToken.js');
const globalFlags = require('../../helpers/globalFlags.js');

class VideoTokenGenerator extends TwilioClientCommand {
  constructor(argv, config, secureStorage) {
    super(argv, config, secureStorage);

    this.showHeaders = true;
  }

  async run() {
    await super.run();

    const accessToken = createToken.call(this);

    let room = this.flags['room-name'];
    let videoGrant = new Twilio.jwt.AccessToken.VideoGrant({ room });
    accessToken.addGrant(videoGrant);

    this.logger.info('Copy/paste this video token into your test application:');
    this.output({ jwt: accessToken.toJwt() }, undefined, {
      showHeaders: false,
    });
  }
}

const VideoTokenGeneratorFlags = {
  'room-name': flags.string({
    description: 'The name of the room this token grants access to',
    required: false,
  }),
};

VideoTokenGenerator.flags = Object.assign(
  VideoTokenGeneratorFlags,
  TwilioClientCommand.flags,
  globalFlags
);
module.exports = VideoTokenGenerator;
