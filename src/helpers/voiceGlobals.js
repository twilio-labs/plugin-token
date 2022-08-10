const { Flags } = require('@oclif/core');

const voiceFlags = {
  'voice-app-sid': Flags.string({
    description: 'The TwiML Application SID for outbound calls, starts with APXXX',
    required: true,
  }),
  'allow-incoming': Flags.string({
    description: 'Allow incoming calls (true/false) (defaults to true)',
    options: ['true', 'false'],
    default: 'true',
    required: false
  }),
  'push-credential-sid': Flags.string({
    description: 'The Push Credential SID for receiving incoming call push notifications, starts with CRXXX',
    required: false
  })
};

const validateTwimlAppSid = function(sid) {
  return (
    sid.startsWith('AP') &&
    sid.length === 34
  );
}

const validatePushCredentialSid = function(sid) {
  return (
    sid.startsWith('CR') &&
    sid.length === 34
  );
}

module.exports = { voiceFlags, validateTwimlAppSid, validatePushCredentialSid };
