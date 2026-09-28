import { useState } from 'react'
import { NewNameText, NewNumberText } from './InputTextFields.jsx'

export const PersonForm = ( props ) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const { handleNewPerson, personExists, handleUpdate, onError } = props

  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (personExists(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { name: newName, number: newNumber }
        handleUpdate(updatedPerson)
      } else {
        onError(`Person not updated: ${newName} already exists in the phonebook`)
      }
    } else {
      handleNewPerson({ name: newName, number: newNumber })
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h3>add a new</h3>
      <form>
        <NewNameText newName={newName} onChange={onNameChange} />
        <NewNumberText newNumber={newNumber} onChange={onNumberChange} />
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
    </div>
  )
}

export const PersonList = ( props ) => {
  console.log(props)
  const { persons, handleDelete } = props
  return (
    <div>
      {persons.map((person) => (
        console.log(person),
        <div key={person.id}>
          {person.name}: {person.number}&nbsp;
          <button onClick={() => handleDelete(person)}>delete</button>
        </div>
      ))}
    </div>
  )
}
