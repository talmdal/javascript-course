require('dotenv').config()

let mongoDBUrl = process.env.MONGODB_URI
let serverPort = process.env.SERVER_PORT

module.exports = { mongoDBUrl, serverPort }
