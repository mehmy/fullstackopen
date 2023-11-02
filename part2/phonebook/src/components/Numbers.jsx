import DeleteButton from './DeleteButton';

const Numbers = ({ numsToShow, getAll, deleteClick }) => {
  return (
    <>
      {numsToShow.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <DeleteButton
            id={person.id}
            name={person.name}
            getAll={getAll}
            deleteClick={deleteClick}
          />
        </li>
      ))}
    </>
  );
};

export default Numbers;
