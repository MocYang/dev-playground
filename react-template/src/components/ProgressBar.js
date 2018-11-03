import React, { useMutationEffect, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

let progressTimestamp = null
let progressTimer = null

const ProgressBar = (props) => {
  const [progress, setProgress] = useState(0)

  const startProgressTicker = (timestamp) => {
    if (!progressTimestamp && timestamp) {
      progressTimestamp = timestamp
    }
    const progressMax = 100
    const progressMin = 0
    const timeRemain = props.interval
    const timePass = timestamp - progressTimestamp
    const currentProgress = Math.floor((progressMax - progressMin) * (timePass) / timeRemain)
    if (currentProgress >= 100) {
      progressTimestamp = null
    }
    setProgress(currentProgress)
    progressTimer = window.requestAnimationFrame(startProgressTicker)
  }

  const cancelProgressTicker = (id) => {
    window.cancelAnimationFrame(id)
    setProgress(0)
    progressTimestamp = null
  }

  // 切换自动轮播
  useMutationEffect(() => {
    console.log(props.reset)
    if (props.run) {
      progressTimer = window.requestAnimationFrame(startProgressTicker)
    }

    return () => {
      cancelProgressTicker(progressTimer)
    }
  }, [props.run, props.reset])

  return (
    <div className={`progressbar ${props.position}`}>
      <div className="progress" style={{width: `${progress}%`}} />
    </div>
  )
}

ProgressBar.defaultProps = {
  position: 'top',
  interval: 3000
}

ProgressBar.propTypes = {
  position: PropTypes.oneOf(['top', 'bottom'])
}

export default ProgressBar
