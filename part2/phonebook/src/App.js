import { useState } from 'react'
import { useEffect } from 'react'
import Filter from './components/Filter'
import AddNewPerson from './components/AddPerson'
import ShowPersons from './components/ShowPersons'
import phoneBookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phoneBookService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const updatePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const changedContact = { ...person, number: newNumber }

    phoneBookService
      .replace(id, changedContact)
      .then(response => {
        setPersons(persons.map(p => p.id !== id ? p : response))
      })
    setNewName('')
    setNewNumber('')
  }

  const addPerson = (e) => {
    e.preventDefault()
    if (persons.some(p => p.name === newName)) {
      if (window.confirm(`${newName} is already taken, do you want to replace the old number with a one?`)) {
        const person = persons.find(p => p.name === newName)
        updatePerson(person.id)
      }
      return
    }
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    phoneBookService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Confirm to delete ${person.name}'s contact?`)) {
      phoneBookService
        .update(id, person)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <AddNewPerson
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      {filteredPersons.map(person =>
        <ShowPersons
          key={person.name}
          person={person}
          deletePerson={() => deletePerson(person.id)} />
      )}
    </div>
  )
}

export default App