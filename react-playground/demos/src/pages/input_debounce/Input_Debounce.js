/**
 * @Author: yangqixin
 * @TIME: 6/2/21 4:57 PM
 * @FILE: Input_Debounce.js
 * @Email: 958292256@qq.com
 */

/*
 关键在于:
 compositionStart 和 compositionEnd 事件.
 */

import React from 'react'

const debounce = function (fn, time = 50) {
  let timer
  return function () {
    let self = this
    let args = arguments

    // if (e.target.composing) {
    //   return
    // }

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      timer = null
      fn.apply(self, args)
    }, time)
  }
}

const fn = debounce((cb) => {
  cb()
}, 200)

const InputDebounce = () => {
  const [v, setV] = React.useState('')
  // const handleInput = React.useCallback((e) => {
  //   console.log(e)
  //   debounce(() => {
  //     setV(e.target.value)
  //   }, 1000)
  // }, [])
  // const handleInput = React.useCallback(debounce((e) => {
  //   console.log(e)
  //   // setV(e.target.value)
  //   if (e.target) {
  //     setV(e.target.value)
  //   }
  // }, 500), [])
  const handleInput = e => {
    console.log(e.target.value)
    let v = e.target.value
    // fn(() => {
      setV(v)
    // })
  }
  const handleCompositionStart = e => {
    console.log('composition start.', e.target.value)
  }
  const handleCompositionEnd = e => {
    console.log('composition end', e.target.value)
    const v = e.target.value
    fn(() => {
      console.log('do something with v: ', v)
    })
  }

  return (
    <div>
      <input
        type="text" value={v}
        onChange={handleInput}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
    </div>
  )
}

export default InputDebounce

