import React, { useMutationEffect, useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

// let progressTimestamp = null
// let progressTimer = null

const ProgressBar = (props) => {
  const progressTimestamp = useRef(null)
  const progressTimer = useRef(null)
  const [progress, setProgress] = useState(0)

  const startProgressTicker = (timestamp) => {
    if (!progressTimestamp.current && timestamp) {
      progressTimestamp.current = timestamp
    }
    const progressMax = 100
    const progressMin = 0
    const timeRemain = props.interval
    const timePass = timestamp - progressTimestamp.current
    const currentProgress = Math.floor((progressMax - progressMin) * (timePass) / timeRemain)
    if (currentProgress >= 100) {
      progressTimestamp.current = null
    }
    setProgress(currentProgress)
    progressTimer.current = window.requestAnimationFrame(startProgressTicker)
  }

  const cancelProgressTicker = (id) => {
    window.cancelAnimationFrame(id)
    setProgress(0)
    progressTimestamp.current = null
  }

  // 切换自动轮播
  // useMutationEffect(() => {
  useEffect(() => {
    console.log(props)
    if (props.run) {
      progressTimer.current = window.requestAnimationFrame(startProgressTicker)
    }

    return () => {
      cancelProgressTicker(progressTimer.current)
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
