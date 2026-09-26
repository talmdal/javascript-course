import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticsLine = (props) => {
  return (
    <div>
      <p>{props.text} {props.value}</p>
    </div>
  )
}

const Totals = (props) => {
  const { good, neutral, bad } = props
  const total = good + neutral + bad

  if (total === 0) {
    return <div>No feedback given</div>
  }
  return (
    <div>
      <p>all {total}</p>
      <p>average {(good - bad) / total}</p>
      <p>positive {good / total * 100} %</p>
    </div>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props
  const total = good + neutral + bad
  return (
    <div>
      <StatisticsLine text='good' value={good} />
      <StatisticsLine text='neutral' value={neutral} />
      <StatisticsLine text='bad' value={bad} />
    </div>
  )
}

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
      <div>
         <h1>give feedback</h1>
        <Button onClick={() => setGood(good + 1)} text='good' />
        <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button onClick={() => setBad(bad + 1)} text='bad' />
        <br />

        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
        <Totals good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
