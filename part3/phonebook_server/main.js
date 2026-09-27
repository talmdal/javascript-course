const PORT = process.env.PHONEBOOK_PORT || 3001

let PERSONS = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => Math.floor(Math.random() * 100000)

const express = require('express')
const morgan = require('morgan')

morgan.token('body', function getBody (req) {
  return req.method === 'POST'
    ? `body: ${JSON.stringify(req.body)}`
    : ''
})
const logger = morgan(':method :url :status - :response-time :body')

const app = express()
app.use(express.json())
app.use(logger)

app.get('/api/persons', (req, res) => {
  res.json(PERSONS)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = PERSONS.find( person => person.id === id )
  console.log(person)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  const {name, number} = body
  console.log(name, number)
  if (!name) {
    return res.status(400).json({
      error: 'name is required'
    })
  }
  if (!number) {
    return res.status(400).json({
      error: 'number is required'
    })
  }
  const person = PERSONS.find(person => person.name === name)
  if (person) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }
  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId()
  }
  PERSONS = PERSONS.concat(newPerson)
  res.json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = PERSONS.find( person => person.id === id )
  if (person) {
    PERSONS = PERSONS.filter( person => person.id !== id)
    res.status(204).end()
  } else {
    res.status(404).end()  }
})

app.get('/info', (req, res) => {
  res.send(
    `
    Phoneebook has info for ${PERSONS.length} people
    <br />
    ${new Date()}
    `
  )
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
