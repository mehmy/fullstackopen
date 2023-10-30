import { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Numbers from './components/Numbers';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setNewFilter] = useState('');

  useEffect(() => {
    console.log('effect');

    axios.get('http://localhost:3001/persons').then((response) => {
      console.log('promise fulfilled');
      setPersons(response.data);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();

    const nameObj = {
      name: newName,
      number: newNumber,
    };

    const result = persons.filter(
      (person) => JSON.stringify(person) === JSON.stringify(nameObj)
    );

    if (result.length > 0) {
      alert(`${result[0].name} is already in the phonebook`);
    } else {
      setPersons(persons.concat(nameObj));
      setNewName('');
      setNewNumber('');
    }
  };

  const changeName = (event) => {
    setNewName(event.target.value);
  };

  const changeNum = (event) => {
    setNewNumber(event.target.value);
  };

  const changeFilter = (event) => {
    setNewFilter(event.target.value);
  };

  const numsToShow =
    filter === ''
      ? persons
      : persons.filter((person) => person.name.toLowerCase().includes(filter));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={changeFilter} />
      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        changeName={changeName}
        newNumber={newNumber}
        changeNum={changeNum}
      />
      <h3>Numbers</h3>
      <Numbers numsToShow={numsToShow} />
    </div>
  );
};

export default App;
