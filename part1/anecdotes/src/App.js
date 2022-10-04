import { useState } from 'react';

const HighestAnecdote = (props) => {
  return (
    <div>
      {props.anecdote}
      <br />
      has {props.votes} votes
    </div>
  )
}

const Button = (props) => {
  return (
    <div>
      <button onClick={props.vote}>vote</button>
      <button onClick={props.randomNumber}>next anecdote</button>
    </div>
  )
}

const NumVotes = (props) => {

  return (
    <div>
      has {props.number} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later.',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(7).fill(0));
  const [mostPopular, setMostPopular] = useState(0);
  const [highestVotes, setHighestVotes] = useState(0);

  const generateRandomNumber = () => {
    let randomNumber = (Math.floor(Math.random() * 7));
    setSelected(randomNumber);
  }

  const upvote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }

  const findHighestVotes = () => {
    let highestValue = Math.max(...votes);
    let popularAnecdote = votes.indexOf(highestValue);
    setMostPopular(popularAnecdote);
    setHighestVotes(highestValue);
  }

  setTimeout(
    findHighestVotes,
    100
  )

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <NumVotes number={votes[selected]} />
      <Button randomNumber={generateRandomNumber} vote={upvote} />
      <h1>Anecdote with most votes</h1>
      <HighestAnecdote anecdote={anecdotes[mostPopular]} votes={highestVotes} />
    </div>
  )
}

export default App