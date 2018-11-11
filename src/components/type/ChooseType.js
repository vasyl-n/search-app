import React from 'react'
import './ChooseType.css'

const ChooseType = (props) => {
  return (
    <div className="choose-type-container">
    {
      props.types.length > 0 &&
      <div className="type-header">
        Select Product Type:
      </div>
    }

      <div className="r-buttons">
        {
          props.types.map((el, indx) => {
            return (
              <div key={indx}>
                <input onChange={() => props.handleChange(indx)} type="checkbox" checked={el.checked} id={el.name} name={el.name}/>
                <label for={el.name}>{el.name}</label>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ChooseType
