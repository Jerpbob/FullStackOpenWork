import { useState } from "react";

const StatisticLine = ({ text, state }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{state}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, total, score }) => {
  if ((good === 0) && (neutral === 0) && (bad === 0)) {
    return (
      <p>No feedback given</p>
    )
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" state={good} />
          <StatisticLine text="neutral" state={neutral} />
          <StatisticLine text="bad" state={bad} />
          <StatisticLine text="total" state={total} />
          <StatisticLine text="average" state={score / total} />
          <StatisticLine text="positive" state={good / total * 100 + " %"} />
        </tbody>
      </table>
    )
  }
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.GoodButton}> good </button>
      <button onClick={props.NeutralButton}> neutral </button>
      <button onClick={props.BadButton}> bad </button>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [score, setScore] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setTotal(total + 1);
    setScore(score + 1);

  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
    setScore(score);
  }

  const handleBadClick = () => {
    setBad(bad + 1);
    setTotal(total + 1);
    setScore(score - 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button GoodButton={handleGoodClick} NeutralButton={handleNeutralClick} BadButton={handleBadClick} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} score={score} />
    </div>
  )
}

export default App