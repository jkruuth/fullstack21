import React from 'react'

const Header = (props) => {
  console.log(props)
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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name} />
      <Content osa1={course.parts[0].name} harjoitus1={course.parts[0].exercises}
               osa2={course.parts[1].name} harjoitus2={course.parts[1].exercises} 
               osa3={course.parts[2].name} harjoitus3={course.parts[2].exercises}/>
      <Total eka={course.parts[0].exercises} toka={course.parts[1].exercises} kolmas={course.parts[2].exercises}/>
    </>
  )
}

export default App