
const morgan = require('morgan')

morgan.token('body', function getBody (req) {
  return req.method === 'POST'
    ? `body: ${JSON.stringify(req.body)}`
    : ''
})

const requestLogger = morgan(':method :url :status - :response-time :body')

module.exports = { requestLogger }
