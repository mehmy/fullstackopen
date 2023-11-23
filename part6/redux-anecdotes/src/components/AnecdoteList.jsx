import { useSelector } from 'react-redux';
import { incrementVote, voteUp } from '../reducers/anecdoteReducer.js';
import store from '../store.js';
import { setNotiTimeOut } from '../reducers/notificationReducer.js';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
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
    store.dispatch(voteUp(id));
    store.dispatch(setNotiTimeOut(`You voted for "${content}" !`, 5));
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
