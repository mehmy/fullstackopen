import React from 'react';
import personService from '../services/persons';
import App from '../App';

const DeleteButton = ({ deleteClick, id, name }) => {
  return (
    <>
      <button onClick={() => deleteClick(id, name)}>delete</button>
    </>
  );
};

export default DeleteButton;
