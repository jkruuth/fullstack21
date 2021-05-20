import React, { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]


  const [selected, setSelected] = useState({

    anecdotes: 0,
    points: new Array(anecdotes.length+1).join('0').split('').map(parseFloat)
  })


  const handleLuku = () => {
    const copy = { ...selected, anecdotes: Math.floor(Math.random() * 6)}
    setSelected(copy)
  }


const aanesta = () => {
  const copy = { ...selected, }
  copy.points[selected.anecdotes] += 1
  setSelected(copy)
}




  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected.anecdotes]} </p>
      <p>on {selected.points[selected.anecdotes]} ääntä</p>
      <Button handleClick={aanesta} text='äänestä'/>
      <Button handleClick={handleLuku} text='seuraava anekdootti'/>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[selected.points.indexOf(Math.max(...selected.points))]}</p>
      <p>on {selected.points[selected.points.indexOf(Math.max(...selected.points))]} ääntä</p>
    </div>
  )
}

export default App