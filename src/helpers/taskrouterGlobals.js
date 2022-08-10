const { Flags } = require('@oclif/core');

const taskrouterFlags = {
  'worker-sid': Flags.string({
    description: 'The Worker SID for this token',
    required: true,
  }),
  'workspace-sid': Flags.string({
    description: 'The Workspace SID for this token',
    required: true,
  })
}

const validateWorkerSid = function(sid) {
  return (
    sid.startsWith('WK') &&
    sid.length === 34
  );
}

const validateWorkspaceSid = function(sid) {
  return (
    sid.startsWith('WS') &&
    sid.length === 34
  );
}

module.exports = { taskrouterFlags, validateWorkerSid, validateWorkspaceSid };
