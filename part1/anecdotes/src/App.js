import { useState } from 'react';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Header = ({ header }) => <h1>{header} </h1>;
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

  const randomNumber = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    console.log('random', random);
    setSelected(random);
    console.log('votes: ', votes);
  };

  const handleVotes = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  const highestVote = votes.indexOf(Math.max(...votes));
  console.log('hoogste', highestVote);

  return (
    <div>
      <Header header="Anecdote of the day"></Header>
      <p>{anecdotes[selected]}</p>
      <Button onClick={randomNumber} text="Give me a random anecdote"></Button>
      <Button onClick={handleVotes} text="Vote for this anecdote"></Button>
      <p>Votes for this anecdote: {votes[selected]}</p>
      <div>
        <Header header="Anecdote with the highest votes"></Header>
        {votes[highestVote] === 0 ? (
          <p>No one has voted today. Be first to vote.</p>
        ) : (
          <div>
            {anecdotes[highestVote]} <br />
            <strong>has {votes[highestVote]} votes</strong>
          </div>
        )}
      </div>
    </div>
  );
};
export default App;
