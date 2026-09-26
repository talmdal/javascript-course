import { useState } from 'react'
import { FilterText } from './components/InputTextFields.jsx'
import { PersonForm, PersonList} from './components/Person.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newFilter, setNewFilter] = useState('')
  
  const personExists = (name) => {
    return persons.some((person) => person.name === name)
  }

  const handleNewPerson = (newPerson) => {
    console.log('Adding new person:', newPerson)
    const newPersons = [
      ...persons, 
      { ...newPerson, id: persons.length + 1 }
    ]
    setPersons(newPersons)
  }

  const filteredList = newFilter === ''
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterText newFilter={newFilter} onChange={(event) => setNewFilter(event.target.value)} />

      <PersonForm 
        handleNewPerson={handleNewPerson}
        personExists={personExists}
      />
      <h3>Numbers</h3>
      < PersonList persons={ filteredList } />
    </div>
  )
}

export default App