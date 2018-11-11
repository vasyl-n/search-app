import React from 'react'
import './Search.css'

const Search = (props) => {
  return (
    <div className="search-container">
      <input placeholder="Search keyword" onChange={props.handleChange} value={props.value}></input>
      <div className="results">
        {
          props.results.map((el, indx) => {
            return <div key={indx} onClick={() => props.handleClick(el.name)} className="result-value">{el.name}</div>
          })
        }
      </div>
    </div>
  )
}

export default Search
