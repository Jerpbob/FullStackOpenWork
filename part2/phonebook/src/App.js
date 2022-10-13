import { useState } from 'react'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <form>
      <div>filter with: <input
        value={filter}
        onChange={handleFilterChange}
      />
      </div>
    </form>
  )
}

const AddNewPerson = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input
          value={props.newName}
          onChange={props.handleNameChange}
        />
      </div>
      <div>
        number: <input
          value={props.newNumber}
          onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const ShowPersons = ({ filteredPersons }) => {
  return filteredPersons.map(person =>
    <div key={person.name}>{person.name} {person.number}</div>)
}

const App = () => {
  const [persons, setPersons] = useState([{
    name: 'Arto Hellas',
    number: '619-6969-691'
  }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    if (persons.some(x => x.name === newName)) {
      alert(`${newName} is already taken`)
      return
    }
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter))

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
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <AddNewPerson addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ShowPersons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App