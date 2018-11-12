import React from 'react'
import './Button.css'

const Button = (props) => (
  <a className="button" href={props.url} target="_blank" rel="noopener noreferrer">
      Proceed to the next step
  </a>
)

export default Button
