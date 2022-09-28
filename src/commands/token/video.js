const { Flags } = require('@oclif/core');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const Twilio = require('twilio');
const createToken = require('../../helpers/accessToken.js');
const globalFlags = require('../../helpers/globalFlags.js');

class VideoTokenGenerator extends TwilioClientCommand {
  constructor(argv, config) {
    super(argv, config);

    this.showHeaders = true;
  }

  async run() {
    await super.run();

    const accessToken = createToken.call(this);

    let room = await this.flags['room-name'];
    let videoGrant = new Twilio.jwt.AccessToken.VideoGrant({ room });
    accessToken.addGrant(videoGrant);

    this.logger.info('Copy/paste this video token into your test application:');
    this.output({ jwt: accessToken.toJwt() }, undefined, {
      showHeaders: false,
    });
  }
}

const VideoTokenGeneratorFlags = {
  'room-name': Flags.string({
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
