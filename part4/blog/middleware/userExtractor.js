const User = require('../models/users')

const userExtractor = async (req, res, next) => {
  const token = req.token

  if (!token || !token.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(token.id)

  if (!user) {
    return res.status(400).json({ error: 'userId missing or not valid' })
  }

  req.user = user
  next()
}

module.exports = { userExtractor }
