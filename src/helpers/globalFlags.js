const { flags } = require('@oclif/command');

const globalFlags = {
  identity: flags.string({
    description: 'The user identity',
    required: true,
  }),
  ttl: flags.integer({
    description: 'Optional TTL for token (up to 24 hours) (value in seconds)',
    required: false,
  })
};

module.exports = globalFlags;
