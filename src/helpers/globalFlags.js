const { Flags } = require('@oclif/core');

const globalFlags = {
	identity: Flags.string({
		description: 'The user identity',
		required: true,
	}),
	ttl: Flags.integer({
		description: 'Optional TTL for token (up to 24 hours) (value in seconds)',
		required: false,
	}),
};

module.exports = globalFlags;
