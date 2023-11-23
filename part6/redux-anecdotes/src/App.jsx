import { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm.jsx';
import AnecdoteList from './components/AnecdoteList.jsx';
import Notification from './components/Notification.jsx';
import Filter from './components/Filter.jsx';
import store from './store.js';
import { setAnecdotes } from './reducers/anecdoteReducer.js';
import anecdoteService from './services/anecdotes.js';

const App = () => {
  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => store.dispatch(setAnecdotes(anecdotes)));
  }, []);

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
