import { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm.jsx';
import AnecdoteList from './components/AnecdoteList.jsx';
import Notification from './components/Notification.jsx';
import Filter from './components/Filter.jsx';
import store from './store.js';

import { initializeAnecdotes } from './reducers/anecdoteReducer.js';

const App = () => {
  useEffect(() => {
    store.dispatch(initializeAnecdotes());
  }, [store.getState()]);

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
