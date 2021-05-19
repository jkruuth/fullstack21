import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
        <Part part={props.osa1} excersise={props.harjoitus1}/>
        <Part part={props.osa2} excersise={props.harjoitus2}/>
        <Part part={props.osa3} excersise={props.harjoitus3}/>
    </div>
  )
}


const Total = (props) => {
  return (
    <p>
      Number of excersises {props.eka + props.toka + props.kolmas}
    </p>
  )
}


const Part = (props) => {
  return (
    <p>{props.part} {props.excersise}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course} />
      <Content osa1={part1} harjoitus1={exercises1}
               osa2={part2} harjoitus2={exercises2} 
               osa3={part3} harjoitus3={exercises3}/>
      <Total eka={exercises1} toka={exercises2} kolmas={exercises3}/>
    </>
  )
}

export default App