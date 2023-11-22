import { useSelector, useDispatch } from 'react-redux';
import { voteUp } from '../reducers/anecdoteReducer.js';

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
  const dispatch = useDispatch();

  const sortAnecdotes = (anecdotes) => {
    return anecdotes.sort((a, b) => b.votes - a.votes);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortAnecdotes(anecdotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteUp(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
