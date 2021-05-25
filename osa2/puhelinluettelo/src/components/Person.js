import React from 'react'

const Person = ({ person, poistaminen }) => {

    return (
      <li>
        {person.name} {person.number}
        <button onClick={poistaminen}>delete</button>  
      </li>
    )
  }

export default Person