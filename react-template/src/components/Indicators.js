import React from 'react'

const Indicators = (props) => {
  return (
    <div className="indicators">
      {
        props.children()
      }
    </div>
  )
}

export default Indicators
