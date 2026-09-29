const express = require('express')
const { requestLogger } = require('./middleware/requestLogger')
const { errorHandler } = require('./middleware/errorHandler')
const { tokenExtractor } = require('./middleware/tokenExtractor')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()
app.use(express.json())
app.use(tokenExtractor)
app.use(requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

module.exports = app
