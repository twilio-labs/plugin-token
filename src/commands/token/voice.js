const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const Twilio = require('twilio');
const createToken = require('../../helpers/accessToken.js');
const globalFlags = require('../../helpers/globalFlags.js');
const { voiceFlags } = require('../../helpers/voiceGlobals.js');
const { validateSid } = require('../../helpers/validation-helpers.js');

class VoiceTokenGenerator extends TwilioClientCommand {
	constructor(argv, config) {
		super(argv, config);

		this.showHeaders = true;
	}

	async run() {
		await super.run();

		const accessToken = createToken.call(this);
		// all flags
		const voiceAppSid = await this.flags['voice-app-sid'];
		const pushCredentialSid = await this.flags['push-credential-sid'];
		const incomingAllow = await this.flags['allow-incoming'];

		if (!validateSid('AP', voiceAppSid)) {
			this.logger.error(
				'Invalid TwiML Application SID, must look like APxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
			);
			process.exit(1);
		}

		// logic for optional pushCredential
		if (pushCredentialSid && !validateSid('CR', pushCredentialSid)) {
			this.logger.error(
				'Invalid Push Credential SID, must look like CRxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
			);
			process.exit(1);
		}

		const voiceGrant = new Twilio.jwt.AccessToken.VoiceGrant({
			outgoingApplicationSid: voiceAppSid,
			incomingAllow,
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
