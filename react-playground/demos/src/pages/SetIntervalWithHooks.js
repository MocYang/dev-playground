import React, { useState, useEffect, useRef } from 'react'

const useInterval = (cb, delay) => {
  const savedCallback = useRef()

  // remember latest callback
  useEffect(() => {
    console.log('update callback')
    savedCallback.current = cb
  }, [cb])

  // set up interval
  useEffect(() => {
    console.log('run tick')
    const tick = () => {
      savedCallback.current()
    }

    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => {
        clearInterval(id)
      }
    }
  })
}

// const Comp = () => {
//   const [count, setCount] = useState(0)
//   const [isRunning, setIsRunning] = useState(false)
//   const [delay, setDelay] = useState(1000)
//
//   useInterval(() => {
//     setCount(count + 1)
//   }, isRunning ? delay : null)
//
//   const handleToggleInterval = () => {
//     setIsRunning(!isRunning)
//   }
//
//   return (
//     <div className="app">
//       <h1>{count}</h1>
//       <button className="tottle" onClick={handleToggleInterval}>on/off</button>
//     </div>
//   )
// }

const Comp = () => {
  let [count, setCount] = useState(0)
  let [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    let id = setInterval(() => {
      setCount(count + 1)
    }, 1000)

    return () => {
      console.log('clear interval')
      clearInterval(id)
    }
  }, [])

  const handleToggleInterval = () => {
    setIsRunning(!isRunning)
  }

  return (
    <div className="app">
      <h1>{count}</h1>
      <button onClick={handleToggleInterval}>on/off</button>
    </div>
  )
}

export default Comp

