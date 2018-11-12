import React, { Component } from 'react';
import './Error.css'

const Error = (props) => {
  return  (
      props.error && 
      <div className="error"> 
        No results were found :(
      </div>
)
}

export default Error
