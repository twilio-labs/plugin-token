const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const globalFlags = require('../../../helpers/globalFlags.js');
const { taskrouterFlags, validateWorkerSid, validateWorkspaceSid } = require('../../../helpers/taskrouterGlobals.js');
const taskrouter = require('twilio').jwt.taskrouter;
const util = taskrouter.util;
const TaskRouterCapability = taskrouter.TaskRouterCapability;
const Policy = TaskRouterCapability.Policy;

class WorkerCapabilityTokenGenerator extends TwilioClientCommand {
  constructor(argv, config, secureStorage) {
    super(argv, config, secureStorage);

    this.showHeaders = true;
  }

  async run() {
    await super.run();

    const TASKROUTER_BASE_URL = 'https://taskrouter.twilio.com';
    const version = 'v1';

    if (!validateWorkerSid(this.flags['worker-sid'])) {
      this.logger.error(
        'Invalid Worker SID, must look like WKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      );
      process.exit(1);
    }

    if (!validateWorkspaceSid(this.flags['workspace-sid'])) {
      this.logger.error(
        'Invalid Workspace SID, must look like WSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      );
      process.exit(1);
    }

    const accountSid = this.twilioClient.accountSid;
    const authToken = this.twilioClient.password;
    const workspaceSid = this.flags['workspace-sid'];
    const workerSid = this.flags['worker-sid'];

    let ttl = this.flags['ttl'];
    const capability = new TaskRouterCapability({
      accountSid,
      authToken,
      workspaceSid,
      channelId: workerSid,
      ttl
    });

    // Helper function to create Policy
    function buildWorkspacePolicy(options) {
      options = options || {};
      var resources = options.resources || [];
      var urlComponents = [TASKROUTER_BASE_URL, version, 'Workspaces', workspaceSid]

      return new Policy({
        url: urlComponents.concat(resources).join('/'),
        method: options.method || 'GET',
        allow: true
      });
    }

    // Event Bridge Policies
    var eventBridgePolicies = util.defaultEventBridgePolicies(accountSid, workerSid);

    // Worker Policies
    var workerPolicies = util.defaultWorkerPolicies(version, workspaceSid, workerSid);

    var workspacePolicies = [
      // Workspace fetch Policy
      buildWorkspacePolicy(),
      // Workspace subresources fetch Policy
      buildWorkspacePolicy({ resources: ['**'] }),
      // Workspace Activities Update Policy
      buildWorkspacePolicy({ resources: ['Activities'], method: 'POST' }),
      // Workspace Activities Worker Reserations Policy
      buildWorkspacePolicy({ resources: ['Workers', workerSid, 'Reservations', '**'], method: 'POST' }),
    ];

    eventBridgePolicies.concat(workerPolicies).concat(workspacePolicies).forEach(function (policy) {
      capability.addPolicy(policy);
    });

    this.logger.info('Copy/paste this video token into your test application:');
    this.output({ jwt: capability.toJwt() }, undefined, {
      showHeaders: false,
    });
  }
}

let globals = { ...globalFlags };
delete globals.identity;

WorkerCapabilityTokenGenerator.flags = Object.assign(
  taskrouterFlags,
  TwilioClientCommand.flags,
  globals,
);
module.exports = WorkerCapabilityTokenGenerator;
