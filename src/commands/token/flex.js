const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { TwilioCliError } = require('@twilio/cli-core').services.error;
const Twilio = require('twilio');
const createToken = require('../../helpers/accessToken.js');
const globalFlags = require('../../helpers/globalFlags.js');
const { taskrouterFlags } = require('../../helpers/taskrouterGlobals.js');
const { validateSid } = require('../../helpers/validation-helpers.js');

class FlexTokenGenerator extends TwilioClientCommand {
	constructor(argv, config) {
		super(argv, config);

		this.showHeaders = true;
	}

	async run() {
		await super.run();

		const workerSid = await this.flags['worker-sid'];
		const workspaceSid = await this.flags['workspace-sid'];
		const accessToken = createToken.call(this);

		if (!validateSid('WK', workerSid)) {
			this.logger.error(
				'Invalid Worker SID, must look like WKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
			);
			process.exit(1);
		}

		if (!validateSid('WS', workspaceSid)) {
			this.logger.error(
				'Invalid Workspace SID, must look like WSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
			);
			process.exit(1);
		}

		const flexGrant = new Twilio.jwt.AccessToken.TaskRouterGrant({
			workerSid,
			workspaceSid,
			role: 'worker',
		});
		accessToken.addGrant(flexGrant);

		this.logger.info('Copy/paste this video token into your test application:');
		this.output({ jwt: accessToken.toJwt() }, undefined, {
			showHeaders: false,
		});
	}
}

const {_identity, globals} = { ...globalFlags };

FlexTokenGenerator.flags = Object.assign(
	taskrouterFlags,
	TwilioClientCommand.flags,
	globals,
);
module.exports = FlexTokenGenerator;
