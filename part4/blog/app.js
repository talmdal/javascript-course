const express = require('express')
const { requestLogger } = require('./middleware/requestLogger')
const { errorHandler } = require('./middleware/errorHandler')
const blogsRouter = require('./controllers/blogs')

const app = express()
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(errorHandler)

module.exports = app
