require('dotenv').config()
const PORT = process.env.PHONEBOOK_PORT || 3001

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const personService = require('./services/person.js')

morgan.token('body', function getBody (req) {
  return req.method === 'POST'
    ? `body: ${JSON.stringify(req.body)}`
    : ''
})
const logger = morgan(':method :url :status - :response-time :body')

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

const app = express()
app.use(express.json())
app.use(logger)
app.use(cors())

app.get('/api/persons', (req, res) => {
  personService.getAll()
    .then(persons => res.json(persons))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  personService.findById(id)
    .then(person => {
      if(person) {
        res.json(person)
      } else {
        res.status(401).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  const { name, number } = body

  personService.findByName(name)
    .then(person => {
      if (person) {
        return next({ status: 400, message: 'name must be unique' })
      }
      else {
        return personService.create(name, number)
          .then(person => {
            res.json(person)
          })
      }
    })
    .catch(error => {
      next(error)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body
  const { name, number } = body

  personService.findById(id)
    .then(person => {
      if(person) {
        return personService.update(id, name, number)
          .then(person => {
            res.json(person)
          })
      } else {
        res.status(401).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  personService.findById(id)
    .then(person => {
      if(person) {
        return personService.destroy(id)
          .then(() => res.status(204).end())
      } else {
        next({ status: 401, message: `No phone number found for '${id}'` })
      }
    })
    .catch(error => {
      next(error)
    })
})

app.get('/info', (req, res, next) => {
  personService.count()
    .then(count => res.send(
      `
      Phonebook has info for ${count} people
      <br />
      ${new Date()}
      `
    ))
    .catch(error => next(error))
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
