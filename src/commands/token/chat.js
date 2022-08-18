const { Flags } = require('@oclif/core');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const Twilio = require('twilio');
const createToken = require('../../helpers/accessToken.js');
const globalFlags = require('../../helpers/globalFlags.js');

class ChatTokenGenerator extends TwilioClientCommand {
  constructor(argv, config) {
    super(argv, config);

    this.showHeaders = true;
  }

  validateChatServiceSid(sid) {
    return (
      sid.startsWith('IS') &&
      sid.length === 34
    );
  }

  async run() {
    await super.run();

    const chatServiceSid = await this.flags['chat-service-sid'];
    const accessToken = createToken.call(this);

    if (!this.validateChatServiceSid(chatServiceSid)) {
      this.logger.error(
        'Invalid Chat Service SID, must look like ISxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      );
      process.exit(1);
    }

    let chatGrant = new Twilio.jwt.AccessToken.ChatGrant({
      serviceSid: chatServiceSid
    });
    accessToken.addGrant(chatGrant);

    this.logger.info('Copy/paste this chat token into your test application:');
    this.output({ jwt: accessToken.toJwt() }, undefined, {
      showHeaders: false,
    });
  }
}

const ChatTokenGeneratorFlags = {
  identity: Flags.string({
    description: 'The user identity for this Chat',
    required: true
  }),
  'chat-service-sid': Flags.string({
    description: 'The service SID for the Chat, starts with ISXXX',
    required: true
  }),
};

ChatTokenGenerator.flags = Object.assign(
  ChatTokenGeneratorFlags,
  TwilioClientCommand.flags,
  globalFlags
);
module.exports = ChatTokenGenerator;
