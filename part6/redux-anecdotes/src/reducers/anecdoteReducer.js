import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

export const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      const id = action.payload.id;
      console.log(id);
      const anecdoteToChange = state.find((n) => n.id === id);
      console.log(anecdoteToChange);

      const changedAnecdote = {
        ...action.payload,
      };

      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { incrementVote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const notes = await anecdoteService.getAll();
    dispatch(setAnecdotes(notes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteUp = (id) => {
  return async (dispatch) => {
    console.log(id);
    const updatedAnecdote = await anecdoteService.updateVote(id);
    dispatch(incrementVote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
