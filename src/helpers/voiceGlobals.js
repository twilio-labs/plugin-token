const { Flags } = require('@oclif/core');

const voiceFlags = {
	'voice-app-sid': Flags.string({
		description:
			'The TwiML Application SID for outbound calls, starts with APXXX',
		required: true,
	}),
	'allow-incoming': Flags.string({
		description: 'Allow incoming calls (true/false) (defaults to true)',
		options: ['true', 'false'],
		default: 'true',
		required: false,
	}),
	'push-credential-sid': Flags.string({
		description:
			'The Push Credential SID for receiving incoming call push notifications, starts with CRXXX',
		required: false,
	}),
};

module.exports = { voiceFlags };
