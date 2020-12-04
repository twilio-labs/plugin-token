const Twilio = require('twilio');
const createToken = function() {

  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    if (!process.env.TWILIO_API_KEY || !process.env.TWILIO_API_SECRET) {
      if (!this.flags['profile']) {
        this.logger.error(
          'You have set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN env variables'
        );
        this.logger.error('For it to work properly, please provide a profile with the --profile flag');
        this.logger.error('Or set the API Key and the API Secret on the environment too:');
        this.logger.error('  export TWILIO_API_KEY=SKXXX (an API Key created at twil.io/get-api-key)');
        this.logger.error('  export TWILIO_API_SECRET=ABC123 (the secret for the API Key)');
        process.exit(1);
      }
    }
  }
  const accessToken = new Twilio.jwt.AccessToken(
    this.twilioClient.accountSid,
    this.twilioClient.username,
    this.twilioClient.password
  );

  if (this.flags['ttl']) {
    if (this.flags['ttl'] > 86400) {
      this.logger.error(
        'TTL must be shorter than 24 hours (in seconds)'
      );
      process.exit(1);
    } else {
      accessToken.ttl = this.flags['ttl'];
    }
  }

  accessToken.identity = this.flags['identity'];

  return accessToken;
}

module.exports = createToken;
