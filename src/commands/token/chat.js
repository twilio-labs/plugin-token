const { flags } = require('@oclif/command');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { TwilioCliError } = require('@twilio/cli-core').services.error;
const Twilio = require('twilio');

class ChatTokenGenerator extends TwilioClientCommand {
  constructor(argv, config, secureStorage) {
    super(argv, config, secureStorage);

    this.showHeaders = true;
  }

  async runCommand() {
    this.logger.info('Copy/paste this chat token into your test application:');
    const accessToken = new Twilio.jwt.AccessToken(
      this.twilioClient.accountSid,
      this.twilioClient.username,
      this.twilioClient.password
    );

    let chatGrant = new Twilio.jwt.AccessToken.ChatGrant({
      serviceSid: this.flags['chat-service-sid'],
    });

    accessToken.addGrant(chatGrant);
    accessToken.identity = this.flags['identity'];

    this.output({ jwt: accessToken.toJwt() }, undefined, {
      showHeaders: false,
    });
  }
}

const ChatTokenGeneratorFlags = {
  identity: flags.string({
    description: 'The user identity for this Chat',
    required: true,
  }),
  'chat-service-sid': flags.string({
    description: 'The service SID for the Chat, starts with ISXXX',
    required: true,
  }),
};

ChatTokenGenerator.flags = Object.assign(
  ChatTokenGeneratorFlags,
  TwilioClientCommand.flags
);
module.exports = ChatTokenGenerator;
