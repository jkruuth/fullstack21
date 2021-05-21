import React from 'react'

const Course = ({ courses }) => {
    return (
      courses.map(course =>
      <div key={course.id}>
          <Header course={course} />
          <Content course={course} />
          <Total course={course} />
      </div>)
      )
    
  }
  
  
  const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part => 
            <Part key={part.id} part={part}/>)}
      </div>
    )
  }
  
  
  const Total = ({ course }) => {
    return (
      <h2>
        total of {course.parts.reduce((acc, current) => acc + current.exercises, 0)} exercises
      </h2>
    )
  }
  
  
  const Part = ({ part }) => {
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }

  export default Course
  