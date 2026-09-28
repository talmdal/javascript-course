const errorHandler = (error, req, res) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    res.status(400).json({ error: error.message })
  }

  res.status(error.status || 500).json({
    error: error.message || 'Internal server error'
  })
}

module.exports = { errorHandler }
