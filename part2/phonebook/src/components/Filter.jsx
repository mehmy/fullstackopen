const Filter = ({ filter, onChange }) => {
  return (
    <>
      filter shown with: <input value={filter} onChange={onChange} />
    </>
  );
};

export default Filter;
