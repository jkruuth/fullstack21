import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'
import personService from './services/persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber]  = useState('')
  const [showFiltered, setShowFiltered] = useState('')
  const [ message, setMessage ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  const notificationType = (message, type='successful') => {
    setMessage({message, type})
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }  

   const handlePoisto = (event,id) => {    
    event.preventDefault()
    const poistettu = persons.find(person => person.id === id)
    personService
      .poisto(id)  
      .then(res => {
        const loput = persons.filter(person => person.id !== id);
        notificationType(`Deleted ${poistettu.name}`)
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
            notificationType(`Changed ${changedPerson.name} number`)
            setPersons(persons.map(person => person.number !== found.number ? person : returned))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            notificationType(
              `Information of ${changedPerson.name} has already been removed from server`, 'error'
            )
            setNewName('')
            setNewNumber('')
            return
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
        notificationType(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log(error.response.data.error)
        notificationType(`${error.response.data.error}`, 'error')
      })
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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