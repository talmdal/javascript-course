// eslint-disable-next-line
const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    res.status(400).json({ error: error.message })
  } else if (error.name === 'MongooseError' && error.message === 'User name must be unique') {
    return res.status(400).json({ error: 'expected `username` to be unique' })
  }

  res.status(error.status || 500).json({
    error: error.message || 'Internal server error'
  })
}

module.exports = { errorHandler }
