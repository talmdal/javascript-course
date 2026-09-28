const mongoose = require('mongoose')

const Person = require('../models/Person')

const getAll = () => Person.find({})

const count = () => Person.countDocuments({})

const findById = (id)  => Person.find({ _id: id })
  .then(result => result[0])

const findByName = (name)  => Person.find({ name: name })
  .then(result => result[0])

const create = (name, number) => {
  const person = new Person({
    name: name,
    number: number
  })

  return person.save()
}

const update = (id, name, number) => {
  const opts = { runValidators: true }
  return Person.updateOne({ _id:  id },
    { name, number },
    opts
  )
}

const destroy = (id) => Person.deleteOne({ _id: id })

const disconnect = () => mongoose.disconnect()

module.exports = { getAll, findById, findByName, count, create, update, destroy, disconnect }
