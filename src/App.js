import React, { useState, useEffect } from "react";
import { Button, Statistics, Persons, PersonForm, Filter, Notification } from "./components";
import db from "./services/service";
import "./App.css";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [avg, setAvg] = useState(0);

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [notify, setNotify] = useState("");

  // get data
  useEffect(() => {
    db.getAll().then((payload) => setPersons(payload));
  }, []);

  // buttons handle
  const handleGood = () => {
    setGood(good + 1);
    setAvg(avg + 1);
  };
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => {
    setBad(bad + 1);
    setAvg(avg - 1);
  };

  // onChange func
  const personChange = (e) => setNewName(e.target.value);
  const numberChange = (e) => setNewNumber(e.target.value);
  const filterChange = (e) => setFilter(e.target.value);

  // submit form
  const onSubmit = (e) => {
    e.preventDefault();
    const existPerson = persons.filter((p) => p.name === newName.trim());

    if (existPerson.length) {
      const updatePerson = existPerson[0];
      const confirm = window.confirm(
        `${updatePerson.name} is already added to phonebook, replace the old number with the new one?`
      );
      if (confirm) {
        updatePerson.number = newNumber;
        db.update(updatePerson)
          .then((payload) => {
            setPersons(persons.map((p) => (p.id === payload.id ? { ...updatePerson } : p)));
            setNotify(`Updated ${updatePerson.name}'s number`);
          })
          .catch((err) => {
            console.log(`${err} Error at confirm`);
            setPersons(
              persons.filter((p) => {
                return p.id !== updatePerson.id;
              })
            );
            setErrorMsg(
              `Information of ${updatePerson.name} has already been removed from the server`
            );
          });
      }
    } else {
      const newPerson = { name: newName.trim(), number: newNumber.trim() };
      db.create(newPerson)
        .then((payload) => {
          setPersons([...persons, payload]);
          setNotify(`Added ${newName}`);
        })
        .catch((err) => {
          console.log(`${err} Error on submit`);
          setErrorMsg(err.response.data.error);
        }, 5000);
    }

    setNewName("");
    setNewNumber("");
    setTimeout(() => {
      setNotify("");
      setErrorMsg("");
    }, 5000);
  };

  // filter
  const filterList =
    filter === ""
      ? persons
      : persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="App">
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
      <br></br>
      <h1>Phonebook</h1>

      {errorMsg ? <Notification msg={errorMsg} cond={true} /> : null}
      {notify ? <Notification msg={notify} cond={false} /> : null}

      <Filter filter={filter} onChange={filterChange} />
      <h1>Add a new</h1>
      <PersonForm
        onSubmit={onSubmit}
        name={{ value: newName, onChange: personChange }}
        number={{ value: newNumber, onChange: numberChange }}
      />
      <h1>Numbers</h1>
      <Persons persons={filterList} setPersons={setPersons} />
    </div>
  );
};

export default App;
