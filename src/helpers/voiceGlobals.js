const { flags } = require('@oclif/command');

const voiceFlags = {
  'voice-app-sid': flags.string({
    description: 'The TwiML Application SID for outbound calls, starts with APXXX',
    required: true,
  }),
  'allow-incoming': flags.string({
    description: 'Allow incoming calls (true/false) (defaults to true)',
    options: ['true', 'false'],
    default: 'true',
    required: false
  })
};

const validateTwimlAppSid = function(sid) {
  return (
    sid.startsWith('AP') &&
    sid.length === 34
  );
}

module.exports = { voiceFlags, validateTwimlAppSid };
