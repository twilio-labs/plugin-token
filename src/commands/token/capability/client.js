const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const ClientCapability = require('twilio').jwt.ClientCapability;
const globalFlags = require('../../../helpers/globalFlags.js');
const { voiceFlags } = require('../../../helpers/voiceGlobals.js');
const { validateSid } = require('../../../helpers/validation-helpers.js');

class ClientCapabilityTokenGenerator extends TwilioClientCommand {
	constructor(argv, config) {
		super(argv, config);

		this.showHeaders = true;
	}

	async run() {
		await super.run();

		const voiceAppSid = await this.flags['voice-app-sid'];
		const ttl = await this.flags.ttl;
		const incomingAllow = await this.flags['allow-incoming'];
		const identity = await this.flags.identity;
		const capability = new ClientCapability({
			accountSid: this.twilioClient.accountSid,
			authToken: this.twilioClient.password,
			ttl,
		});

		if (!validateSid('AP', voiceAppSid)) {
			this.logger.error(
				'Invalid TwiML Application SID, must look like APxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
			);
			process.exit(1);
		}

		capability.addScope(
			new ClientCapability.OutgoingClientScope({
				applicationSid: voiceAppSid,
			}),
		);

		if (incomingAllow) {
			capability.addScope(new ClientCapability.IncomingClientScope(identity));
		}

		this.logger.info('Copy/paste this voice token into your test application:');
		this.output({ jwt: capability.toJwt() }, undefined, {
			showHeaders: false,
		});
	}
}

ClientCapabilityTokenGenerator.flags = Object.assign(
	voiceFlags,
	TwilioClientCommand.flags,
	globalFlags,
);
module.exports = ClientCapabilityTokenGenerator;
