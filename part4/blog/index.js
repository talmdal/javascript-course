const app = require('./app')
const config = require('./utils/config')

const serverPort = config.serverPort
app.listen(serverPort, () => {
  console.log(`Server running on port ${serverPort}`)
})
