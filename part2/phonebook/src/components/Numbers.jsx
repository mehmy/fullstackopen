const Numbers = ({ numsToShow }) => {
  return (
    <>
      {numsToShow.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
    </>
  );
};

export default Numbers;
