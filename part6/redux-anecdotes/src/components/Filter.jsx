import { setFilter } from '../reducers/filterReducer';
import store from '../store';

const Filter = () => {
  const handleChange = (event) => {
    store.dispatch(setFilter(event.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
