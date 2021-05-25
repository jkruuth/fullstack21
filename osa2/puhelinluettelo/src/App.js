import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personService from './services/persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber]  = useState('')
  const [showFiltered, setShowFiltered] = useState('')


  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])


  const handlePoisto = (event,id) => {    
    event.preventDefault()
    axios.delete(`http://localhost:3001/persons/${id}`)  
      .then(res => {  
        console.log(res);  
        console.log(res.data);  
    
        const loput = persons.filter(person => person.id !== id);  
        setPersons(loput);  
      })  
    
  }

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
    if(found !== undefined) {
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)
      if (result) {
        const changedPerson = { ...found, number: personObject.number }
        personService
          .update(found.id, changedPerson)
          .then(returned => {
            setPersons(persons.map(person => person.number !== found.number ? person : returned))
          })
          return
      } else {
        setNewName('')
        setNewNumber('')
        return
      }
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
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
                .map(person => 
                <Person key={person.id} 
                        person={person} 
                        poistaminen={(event) => handlePoisto(event, person.id)}/> 
          )}
      </ul>
    </div>
  )

}

export default App