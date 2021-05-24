import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber]  = useState('')
  const [showFiltered, setShowFiltered] = useState('')


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }


  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const found = persons.find(person => person.name === personObject.name)
    console.log(found)
    if(found !== undefined) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={showFiltered} muutos={event => setShowFiltered(event.target.value)} />

      <h3>add a new</h3>

      <PersonForm addPerson={addPerson} 
                  newName={newName} 
                  handleNameChange={handleNameChange}
                  newNumber={newNumber}
                  handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <ul>
        {persons.filter(person => person.name.toLowerCase().includes(showFiltered) || showFiltered === '')
                .map(person => <Person key={person.name} person={person} /> 
          )}
      </ul>
    </div>
  )

}

export default App