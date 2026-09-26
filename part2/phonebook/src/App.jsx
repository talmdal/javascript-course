import { useState, useEffect } from 'react'
import { FilterText } from './components/InputTextFields.jsx'
import { PersonForm, PersonList} from './components/Person.jsx'
import Notification from './components/Notification.jsx'
import personsService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [msgType, setMsgType] = useState('success')
  
  useEffect(() => {
    personsService
      .getAll()
      .then(data => {
        console.log('Fetched persons:', data)
        setPersons(data)
      })
  }, [])

  const personExists = (name) => {
    return persons.some((person) => person.name === name)
  }

  const handleNewPerson = (newPerson) => {
    console.log('Adding new person:', newPerson)
    personsService.create(newPerson)
      .then(data => {
        console.log('Person added response:', data)
        setPersons([...persons, data])
        setMsgType('success')
        setNotification(`Added ${newPerson.name}`)
      })
      .catch(error => {
        setMsgType('error')
        setNotification(`Error adding person: ${error.response.data.error}`)
        console.error('Error adding person:', error)
      })
  }

  const findPersonByName = (name) => {
    return persons.find((person) => person.name === name)
  }

  const updatedPerson = (updatedPerson) => {
    const existingPerson = findPersonByName(updatedPerson.name)
    if (!existingPerson) {
      console.error('Person not found:', updatedPerson.name)
      setMsgType('error')
      setNotification(`Person not found: ${updatedPerson.name}`)
      return
    }
    updatedPerson.id = existingPerson.id
    console.log('Updating person:', updatedPerson)
    personsService.update(updatedPerson.id, updatedPerson)
      .then(data => {
        console.log('Person updated:', data)
        const newSet = persons.map(person => person.id === updatedPerson.id ? updatedPerson : person)
        setPersons(newSet)
        setMsgType('success')
        setNotification(`Updated ${updatedPerson.name}'s number`)
      })
      .catch(error => {
        console.error('Error updating person:', error)
        setMsgType('error')
        setNotification(`Error updating person: ${error.response.data.error}`)
      })
  }

  const handleDelete = (person) => {
    console.log('Deleting person:', person)
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personsService.destroy(person.id)
        .then(data => {
          console.log('Person deleted:', data)
          setPersons(persons.filter(p => p.id !== person.id))
          setMsgType('success')
          setNotification(`Deleted ${person.name}`)
        })
        .catch(error => {
          console.error('Error deleting person:', error)
          setMsgType('error')
          setNotification(`Error deleting person: ${error.response.data.error}`)
        })
    }
  }

  const filteredList = newFilter === ''
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msgType={msgType} message={notification} />
      <FilterText newFilter={newFilter} onChange={(event) => setNewFilter(event.target.value)} />

      <PersonForm 
        handleNewPerson={handleNewPerson}
        personExists={personExists}
        handleUpdate={updatedPerson}
        onError={(errorMsg) => {
          setMsgType('error')
          setNotification(errorMsg)
        }}
      />
      <h3>Numbers</h3>
      < PersonList persons={ filteredList } handleDelete={handleDelete} />
    </div>
  )
}

export default App