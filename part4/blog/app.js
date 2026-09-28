const express = require('express')
const { logger } = require('./middleware/requestLogger')
const { errorHandler } = require('./middleware/errorHandler')
const blogsRouter = require('./controllers/blogs')

const app = express()
app.use(express.json())
app.use(logger)

app.use('/api/blogs', blogsRouter)

app.use(errorHandler)

const config = require('./utils/config')

const serverPort = config.serverPort
app.listen(serverPort, () => {
  console.log(`Server running on port ${serverPort}`)
})
