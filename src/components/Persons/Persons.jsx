import React from "react";
import db from "../../services/service";

const Persons = ({ persons, setPersons }) => {
  const onClick = (obj) => {
    const confirm = window.confirm(`Delete ${obj.name}?`);
    if (confirm) {
      db.remove(obj.id).then((payload) => {
        setPersons(persons.filter((p) => p.id !== obj.id));
      });
    }
  };

  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => onClick(person)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
