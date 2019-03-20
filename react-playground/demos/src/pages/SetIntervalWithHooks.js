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
      // 此effect值执行一次，因为依赖数组为空，所以，此时的定时器一直运行，因为闭包的关系，count值总是0。
      console.log('interval running: ', count)
      setCount(count + 1)
    }, 2000)

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

