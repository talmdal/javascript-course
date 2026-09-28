require('dotenv').config()
const personService = require('./services/person.js')

// MOve past the node environment args to ours
const args = process.argv.slice(2)

if (args.length === 0) {
  console.log('phonebook:')
  personService.getAll()
    .then(persons => {
      console.log('returned from get all', persons)
      if (persons.length === 0) {
        console.log('Is empty')
      } else {
        persons.forEach(person => {
          const { name, number } = person
          console.log(name, number)
        })
      }
    })
    .catch(error => {
      console.error(error)
      process.exitCode = 1
    })
    .finally(() => personService.disconnect())
} else if (args.length === 2) {
  personService.create(args[0], args[1])
    .then(person => console.log(`added ${person.name} ${person.number} to phonebook`))
    .catch(error => {
      console.error(error)
      process.exitCode = 1
    })
    .finally(() => personService.disconnect())
} else {
  console.log('Invalid arguments, expecting a name and a number')
  process.exitCode = 1
}
