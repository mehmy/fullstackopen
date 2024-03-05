import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote, getAnecdotes, updateAnecdote } from './requests';
import { useReducer } from 'react';
import { CreateContext } from './CreateContext';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return action.payload;
    case 'VOTE':
      return action.payload;
    case 'ERROR':
      return action.payload;
  }
};

const App = () => {
  const queryClient = useQueryClient();
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  );

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    notificationDispatch({
      type: 'VOTE',
      payload: `anecdote '${anecdote.content}' is voted`,
    });
    setTimeout(() => {
      notificationDispatch({ type: 'VOTE', payload: '' });
    }, 5000);
  };

  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <CreateContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    </CreateContext.Provider>
  );
};

export default App;
