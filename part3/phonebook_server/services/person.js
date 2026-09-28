const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const getAll = () => Person.find({})
  .then(result => result.map(person => ({
    name: person.name,
    number: person.number,
    id: person._id
  })))

const create = (name, number) => {
  const person = new Person({
    name: name,
    number: number
  })

  return person.save()
}

const disconnect = () => mongoose.disconnect()

module.exports = { getAll, create, disconnect /*, update, destroy*/ }
