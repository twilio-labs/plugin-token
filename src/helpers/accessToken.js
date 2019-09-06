const Twilio = require('twilio');

const createToken = function() {

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
