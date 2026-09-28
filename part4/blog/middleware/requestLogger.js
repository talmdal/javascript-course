
const morgan = require('morgan')

morgan.token('body', function getBody (req) {
  return req.method === 'POST'
    ? `body: ${JSON.stringify(req.body)}`
    : ''
})

const logger = morgan(':method :url :status - :response-time :body')

module.exports = { logger }
