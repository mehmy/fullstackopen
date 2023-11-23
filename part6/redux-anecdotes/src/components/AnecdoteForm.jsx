import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotiTimeOut } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';
import store from '../store';

const AnecdoteForm = () => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    store.dispatch(createAnecdote(content));
    store.dispatch(
      setNotiTimeOut(`You created the anecdote  "${content}" !`, 5)
    );
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button name="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
