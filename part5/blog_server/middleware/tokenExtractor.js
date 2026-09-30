const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

const tokenExtractor = (req, res, next) => {
  const token = getTokenFrom(req)
  if (!token) {
    req.token = null
    return next()
  }
  try {
    req.token = jwt.verify(token, process.env.SECRET)
  } catch {
    return res.status(401).json({ error: 'token invalid' })
  }

  if (!req.token.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  next()
}

module.exports = { tokenExtractor }
