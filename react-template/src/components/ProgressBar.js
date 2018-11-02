import React from 'react'
import PropTypes from 'prop-types'
const ProgressBar = (props) => {
  const {
    progress,
    position
  } = props

  return (
    <div className={`progressbar ${position}`}>
      <div className="progress" style={{width: `${progress}%`}} />
    </div>
  )
}

ProgressBar.defaultProps = {
  progress: 0,
  animate: false,
  position: 'top'
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  position: PropTypes.oneOf(['top', 'bottom'])
}

export default ProgressBar
