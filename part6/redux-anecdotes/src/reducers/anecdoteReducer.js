const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const voteUp = (id) => {
  return {
    type: 'INCREMENT',
    payload: { id },
  };
};

export const newAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content: content,
      id: getId(),
      votes: 0,
    },
  };
};

const anecdotesState = anecdotesAtStart.map(asObject);
const initialState = { anecdotes: [...anecdotesState], filter: '' };
console.log(initialState);

const anecdoteReducer = (state = initialState.anecdotes, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      const id = action.payload.id;
      const anecdoteToChange = state.find((n) => n.id === id);
      const votes = anecdoteToChange.votes;

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: votes + 1,
      };

      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    }
    case 'NEW_ANECDOTE': {
      return state.concat(action.payload);
    }
    default:
      return state;
  }
};

export default anecdoteReducer;
