import { useState, useEffect } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Numbers from './components/Numbers';
import personService from './services/persons';
import Notification from './components/Notification';
import ErrorMessage from './components/ErrorMessage';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setNewFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [notMessage, setNotMessage] = useState(null);

  useEffect(() => {
    console.log('effect');
    getAllPersons();
  }, []);

  const getAllPersons = () => {
    personService.getAll().then((personsData) => {
      console.log('promise fulfilled');
      console.log(personsData);
      setPersons(personsData);
    });
  };

  const handleClickDelete = (id, name) => {
    personService
      .getElementById(id)
      .then((personById) => {
        console.log(personById.name);
        if (window.confirm(`Delete ${personById.name}`)) {
          personService.deleteEntr(id).then(() => {
            getAllPersons();
            setNotMessage(`${personById.name} is deleted!`);
            setTimeout(() => setNotMessage(null), 5000);
          });
        }
      })
      .catch((error) => {
        setErrorMessage(
          `Information of ${name} has already been removed from the server`
        );
        setTimeout(() => setErrorMessage(null), 5000);
        getAllPersons();
      });
  };

  const addName = (event) => {
    event.preventDefault();

    const nameObj = {
      name: newName,
      number: newNumber,
    };

    const person = persons.filter((e) => e.name === nameObj.name);

    if (person.length > 0) {
      if (
        window.confirm(
          `${nameObj.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        personService.update(person[0].id, nameObj).then(() => {
          getAllPersons();
          setNotMessage(`${nameObj.name} is updated!`);
          setTimeout(() => setNotMessage(null), 5000);
        });
      }
    } else {
      personService.create(nameObj).then((personsData) => {
        setPersons(persons.concat(personsData));
        nullafyNameNum();
        setNotMessage(`${nameObj.name} is created!`);
        setTimeout(() => setNotMessage(null), 5000);
      });
    }
  };

  const nullafyNameNum = () => {
    setNewName('');
    setNewNumber('');
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
      <Notification message={notMessage} />
      <ErrorMessage message={errorMessage} />

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
      <Numbers
        numsToShow={numsToShow}
        getAll={getAllPersons}
        deleteClick={handleClickDelete}
      />
    </div>
  );
};

export default App;
