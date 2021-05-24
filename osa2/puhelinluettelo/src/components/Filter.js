import React from 'react'

const Filter = ({ filter, muutos }) => {
    return (
        <div>
            filter shown with
            <input id={filter}
                   type="text"
                   value={filter}
                   onChange={muutos}/>
        </div>
    )
}

export default Filter