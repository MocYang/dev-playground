import React, { useState, useEffect, useRef, useReducer } from 'react'

const useInterval = (cb, delay) => {
  const savedCallback = useRef()

  // remember latest callback
  useEffect(() => {
    console.log('update callback')
    savedCallback.current = cb
  }, [ cb ])

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

// const Comp = () => {
//   let [count, setCount] = useState(0)
//   let [isRunning, setIsRunning] = useState(true)
//
//   useEffect(() => {
//     let id = setInterval(() => {
//       // 此effect值执行一次，因为依赖数组为空，所以，此时的定时器一直运行，因为闭包的关系，count值总是0。
//       console.log('interval running: ', count)
//       // setCount(count + 1)
//
//       // to fix this, use setState updater form
//       setCount(c => c + 1)
//     }, 2000)
//
//     return () => {
//       console.log('clear interval')
//       clearInterval(id)
//     }
//   }, [])
//
//   const handleToggleInterval = () => {
//     setIsRunning(!isRunning)
//   }
//
//   return (
//     <div className="app">
//       <h1>{count}</h1>
//       <button onClick={handleToggleInterval}>on/off</button>
//     </div>
//   )
// }

const initState = {
  count: 0,
  step: 1
}

const reducer = (state, action) => {
  const { count, step } = state
  if (action.type === 'click') {
    return { ...state, count: count + Number(step) }
  } else if (action.type === 'step') {
    return { ...state, step: action.payload }
  } else {
    return state
  }
}

const Comp = () => {
  const [ state, dispatch ] = useReducer(reducer, initState)

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'click' })
    }, 1000)

    return () => clearInterval(id)
  }, [dispatch])

  return (
    <div>
      <p>count: {state.count}</p>
      <hr/>
      <input
        type="number"
        max={10}
        min={1}
        onChange={e => dispatch({ type: 'step', payload: e.target.value })} value={state.step}
      />
    </div>
  )
}

export default Comp

