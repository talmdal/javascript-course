import { useState } from 'react'
import { NewNameText, NewNumberText } from './InputTextFields.jsx'

export const PersonForm = ( props ) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const { handleNewPerson, personExists } = props

  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (personExists(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      handleNewPerson({ name: newName, number: newNumber })
      setNewName('')
      setNewNumber('')
    }
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
  return (
    <div>
      {props.persons.map((person) => (
        console.log(person),
        <p key={person.id}>
          {person.name}: {person.number}
        </p>
      ))}
    </div>
  )
}
