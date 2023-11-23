import { useSelector } from 'react-redux';
import { incrementVote } from '../reducers/anecdoteReducer.js';
import store from '../store.js';
import { setNotiTimeOut } from '../reducers/notificationReducer.js';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    console.log(state);
    console.log(state.filter);
    console.log(state.anecdotes);
    if (state.filter === 'ALL' || state.filter === '') {
      return state.anecdotes;
    } else {
      return state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter)
      );
    }
  });

  const sortAnecdotes = (anecdotes) => {
    console.log(anecdotes);
    const arrayForSort = [...anecdotes];
    return arrayForSort.sort((a, b) => b.votes - a.votes);
  };

  const handleClick = (id, content) => {
    store.dispatch(incrementVote(id));
    store.dispatch(setNotiTimeOut(`You voted for "${content}" !`, 5000));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortAnecdotes(anecdotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleClick(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
