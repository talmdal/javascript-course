const mongoose = require('mongoose')
const config = require('../utils/config')

const init = () => {
  mongoose.set('strictQuery',false)

  return mongoose.connect(config.mongoDBUrl, { family: 4 })
    .then(() => {
      console.log('connected to MongoDB')
    })
}

module.exports = { init }
