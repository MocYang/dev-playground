import React from 'react'

const Indicators = (props) => {
  return (
    <div className="indicators">
      {
        props.render()
      }
    </div>
  )
}

export default Indicators
