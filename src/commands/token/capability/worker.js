const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const globalFlags = require('../../../helpers/globalFlags.js');
const { taskrouterFlags } = require('../../../helpers/taskrouterGlobals.js');
const { validateSid } = require('../../../helpers/validation-helpers.js');
const taskrouter = require('twilio').jwt.taskrouter;
const util = taskrouter.util;
const TaskRouterCapability = taskrouter.TaskRouterCapability;
const Policy = TaskRouterCapability.Policy;

class WorkerCapabilityTokenGenerator extends TwilioClientCommand {
	constructor(argv, config) {
		super(argv, config);

		this.showHeaders = true;
	}

	async run() {
		await super.run();

		const workerSid = await this.flags['worker-sid'];
		const workspaceSid = await this.flags['workspace-sid'];
		const ttl = await this.flags.ttl;
		const TASKROUTER_BASE_URL = 'https://taskrouter.twilio.com';
		const version = 'v1';

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

		const accountSid = this.twilioClient.accountSid;
		const authToken = this.twilioClient.password;

		const capability = new TaskRouterCapability({
			accountSid,
			authToken,
			workspaceSid,
			channelId: workerSid,
			ttl,
		});

		// Helper function to create Policy
		function buildWorkspacePolicy(options) {
			const internalOptions = options || {};
			const resources = internalOptions.resources || [];
			const urlComponents = [
				TASKROUTER_BASE_URL,
				version,
				'Workspaces',
				workspaceSid,
			];

			return new Policy({
				url: urlComponents.concat(resources).join('/'),
				method: internalOptions.method || 'GET',
				allow: true,
			});
		}

		// Event Bridge Policies
		const eventBridgePolicies = util.defaultEventBridgePolicies(
			accountSid,
			workerSid,
		);

		// Worker Policies
		const workerPolicies = util.defaultWorkerPolicies(
			version,
			workspaceSid,
			workerSid,
		);

		const workspacePolicies = [
			// Workspace fetch Policy
			buildWorkspacePolicy(),
			// Workspace subresources fetch Policy
			buildWorkspacePolicy({ resources: ['**'] }),
			// Workspace Activities Update Policy
			buildWorkspacePolicy({ resources: ['Activities'], method: 'POST' }),
			// Workspace Activities Worker Reserations Policy
			buildWorkspacePolicy({
				resources: ['Workers', workerSid, 'Reservations', '**'],
				method: 'POST',
			}),
		];

		eventBridgePolicies.concat(workerPolicies).concat(workspacePolicies);

		for (const policy of eventBridgePolicies) {
			capability.addPolicy(policy);
		}

		this.logger.info('Copy/paste this video token into your test application:');
		this.output({ jwt: capability.toJwt() }, undefined, {
			showHeaders: false,
		});
	}
}

const globals = { ...globalFlags };
globals.identity = undefined;

WorkerCapabilityTokenGenerator.flags = Object.assign(
	taskrouterFlags,
	TwilioClientCommand.flags,
	globals,
);

module.exports = WorkerCapabilityTokenGenerator;
