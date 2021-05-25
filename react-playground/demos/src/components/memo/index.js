/**
 * @Author: yangqixin
 * @TIME: 5/25/21 9:32 PM
 * @FILE: index.js
 * @Email: 958292256@qq.com
 */
import React, { useState } from 'react'

const Text = (props) => {
  console.log('Text rendered.')
  if (props) {
    return (
      <div>
        <span>num: {props.num}</span>
        <br/>
        <span>number: {props.number}</span>
      </div>
    )
  }
}

const areEqual = (preProps, nextProps) => {
  // 相同的 props,组件不渲染
  if (preProps.number === nextProps.number) {
    return true

    // 大于等于 5,依旧不渲染
  } else if (preProps.number !== nextProps.number && nextProps.number >= 5) {
    return true

  } else {
    // 其它情况,渲染
    return false
  }
}

const MemoText = React.memo(Text, areEqual)

const TestMemo = () => {
  const [number, setNumber] = useState(0)
  const [num, setNum] = useState((0))
  return (
    <div>
      <div>
        <span>num: {num}</span>
        <br/>
        <button onClick={() => setNum(num + 1)}>num++</button>
        <button onClick={() => setNum(num - 1)}>num--</button>
      </div>
      <div>
        <span>number: {number}</span>
        <br/>
        <button onClick={() => setNumber(number + 1)}>number++</button>
        <button onClick={() => setNumber(number - 1)}>number--</button>
      </div>
      <div>
        <MemoText number={number} num={num}/>
      </div>
    </div>
  )
}

export default TestMemo
