import React, { useState } from 'react'


const Statistics = (props) => {
  if (props.good + props.bad + props.neutral === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.good+props.neutral+props.bad} />
      <StatisticLine text="average" value={((props.bad * -1) + 
                   (props.good * 1) + 
                   (props.neutral * 0)) / (props
                   .bad + props.good + props.neutral)} />

      <StatisticLine text="positive" value={props.good/(props.bad + props.good + props.neutral) } merkki='%'/>
    </div>
  )
}


const StatisticsArray = (props) => {
  if (props.good + props.neutral + props.bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
      <tr>
        <td>good</td>
        <td>{props.good}</td>
      </tr>
      <tr>
        <td>neutral</td>
        <td>{props.neutral}</td>
      </tr>
      <tr>
        <td>bad</td>
        <td>{props.bad}</td>
      </tr>
      <tr>
        <td>all</td>
        <td>{props.good + props.neutral + props.bad}</td>
      </tr>
      <tr>
        <td>average</td>
        <td>{((props.good * 1) + (props.neutral * 0) + (props.bad * -1)) / (props.good + props.neutral + props.bad)}</td>
      </tr>
      </tbody>
      </table>
    </div>
  )
}


const StatisticLine = (props) => {
  return(
  <p>{props.text} {props.value} {props.merkki}</p>
  )
}


const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGood = () => {
    setGood(good + 1)
  }


  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }


  const handleBad = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad}/>

      <StatisticsArray good={good} neutral={neutral} bad={bad}/>
    </div>

    
    
  )
}

export default App