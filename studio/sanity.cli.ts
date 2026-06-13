import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '8ach7il9',
    dataset: 'production'
  },
  deployment: {
    appId: 'zhw4j3jhos66232ktvso30ac',
    autoUpdates: true,
  }
})
