const Twilio = require('twilio');
const createToken = function () {
	if (this.twilioClient.accountSid === this.twilioClient.username) {
		this.logger.error(
			`You have set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN env variables.\n
  For it to work properly, please provide a profile with the --profile flag
  Or set the API Key and the API Secret on the environment too:
    export TWILIO_API_KEY=SKXXX (an API Key created at twil.io/get-api-key)
    export TWILIO_API_SECRET=ABC123 (the secret for the API Key)
  `,
		);
		process.exit(1);
	}

	const accessToken = new Twilio.jwt.AccessToken(
		this.twilioClient.accountSid,
		this.twilioClient.username,
		this.twilioClient.password,
	);

	if (this.flags.ttl) {
		if (this.flags.ttl > 86400) {
			this.logger.error('TTL must be shorter than 24 hours (in seconds)');
			process.exit(1);
		} else {
			accessToken.ttl = this.flags.ttl;
		}
	}

	accessToken.identity = this.flags.identity;

	return accessToken;
};

module.exports = createToken;
