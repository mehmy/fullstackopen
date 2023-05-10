import { useState } from 'react';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Header = ({ header }) => <h1>{header}</h1>;

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);
const Statistics = ({ good, neutral, bad, allClicks }) => {
  if (allClicks === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="Good: " value={good} />
        <StatisticLine text="Neutral: " value={neutral} />
        <StatisticLine text="Bad: " value={bad} />
        <StatisticLine text="All Clicks: " value={allClicks} />
        <StatisticLine
          text="Average: "
          value={(good - bad) / (good + neutral + bad)}
        />
        <StatisticLine
          text="Percentage of positive feedback: "
          value={(good / (good + neutral + bad)) * 100 + '%'}
        />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setClicks] = useState(0);

  const HandleGoodClicks = () => {
    setGood(good + 1);
    setClicks(allClicks + 1);
  };

  const HandleNeutralClicks = () => {
    setNeutral(neutral + 1);
    setClicks(allClicks + 1);
  };
  const HandleBadClicks = () => {
    setBad(bad + 1);
    setClicks(allClicks + 1);
  };

  return (
    <div>
      <Header header={'Give feedback'}></Header>
      <Button onClick={HandleGoodClicks} text="good" />
      <Button onClick={HandleNeutralClicks} text="neutral" />
      <Button onClick={HandleBadClicks} text="bad" />
      <Header header={'Statistics'}></Header>
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        allClicks={allClicks}
      />
    </div>
  );
};

export default App;
