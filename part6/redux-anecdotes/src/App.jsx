import AnecdoteForm from './components/AnecdoteForm.jsx';
import AnecdoteList from './components/AnecdoteList.jsx';
import Filter from './components/Filter.jsx';

const App = () => {
  return (
    <div>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
