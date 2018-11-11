import React from 'react'
import './Search.css'

const Search = (props) => {
  return (
    <div>
      <input onChange={props.handleChange}></input>
      <div className="results">
        {
          props.results.map((el) => {
            return <div className="result-value">{el.name}</div>
          })
        }
      </div>
    </div>
  )
}

export default Search
