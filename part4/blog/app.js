const express = require('express')
const blogsRouter = require('./controllers/blogs')

const app = express()
app.use(express.json())

app.use('/api/blogs', blogsRouter)

const config = require('./utils/config')
console.log(JSON.stringify(config))
const serverPort = config.serverPort
app.listen(serverPort, () => {
  console.log(`Server running on port ${serverPort}`)
})
