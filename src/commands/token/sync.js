const { Flags } = require('@oclif/core');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const Twilio = require('twilio');
const createToken = require('../../helpers/accessToken.js');
const globalFlags = require('../../helpers/globalFlags.js');

class SyncTokenGenerator extends TwilioClientCommand {
  constructor(argv, config) {
    super(argv, config);

    this.showHeaders = true;
  }

  validateSyncServiceSid(sid) {
    return (
      sid.startsWith('IS') &&
      sid.length === 34
    );
  }

  async run() {
    await super.run();

    const syncServiceSid = await this.flags['sync-service-sid'];
    const accessToken = createToken.call(this);

    if (!this.validateSyncServiceSid(syncServiceSid)) {
      this.logger.error(
        'Invalid Sync Service SID, must look like ISxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      );
      process.exit(1);
    }

    let syncGrant = new Twilio.jwt.AccessToken.SyncGrant({
      serviceSid: syncServiceSid
    });
    accessToken.addGrant(syncGrant);

    this.logger.info('Copy/paste this sync token into your test application:');
    this.output({ jwt: accessToken.toJwt() }, undefined, {
      showHeaders: false,
    });
  }
}

const SyncTokenGeneratorFlags = {
  identity: Flags.string({
    description: 'The user identity for this Sync Service',
    required: true,
  }),
  'sync-service-sid': Flags.string({
    description: 'The service SID for the Sync, starts with ISXXX',
    required: true,
  }),
};

SyncTokenGenerator.flags = Object.assign(
  SyncTokenGeneratorFlags,
  TwilioClientCommand.flags,
  globalFlags
);
module.exports = SyncTokenGenerator;
