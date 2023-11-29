import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import { useContext } from 'react';
import { CreateContext } from '../CreateContext';

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(CreateContext);

  const queryClient = useQueryClient();
  const getId = () => (100000 * Math.random()).toFixed(0);

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
    onError: () => {
      dispatch({
        type: 'ERROR',
        payload: 'an anecdote should be minimal 5 or more characters',
      });
      setTimeout(() => {
        dispatch({ type: 'ERROR', payload: '' });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 });
    dispatch({ type: 'ADD', payload: `anecdote ${content} added` });
    setTimeout(() => {
      dispatch({ type: 'ADD', payload: '' });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
