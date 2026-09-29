require('dotenv').config()

let mongoDBUrl = process.env.NODE_ENV === 'test'
  ? process.env.MONGODB_TEST_URI
  : process.env.MONGODB_URI
let serverPort = process.env.SERVER_PORT

module.exports = { mongoDBUrl, serverPort }
