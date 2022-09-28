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

module.exports = { taskrouterFlags };
