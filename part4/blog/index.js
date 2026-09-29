const app = require('./app')
const config = require('./utils/config')
const { init } = require('./utils/mongo')

const serverPort = config.serverPort
init()
  .then(() => {
    app.listen(serverPort, () => {
      console.log(`Server running on port ${serverPort}`)
    })
  })
  .catch(error => {
    console.error('error connecting to MongoDB:', error.message)
    process.exitCode = 1
  })
