import React, { useState } from 'react'

const Index = () => {

  const [s1, setS1] = useState(false)
  const [s2, setS2] = useState(false)
  const [s3, setS3] = useState(false)
  const handleTestUseState = (value) => {
    setS1(value)
    setS2(value)
    setS3(value)
  }
  // 3次set,触发了一次render
  console.log('render call...')
  return (
    <div>
      <ul>
        <li>{s1}</li>
        <li>{s2}</li>
        <li>{s3}</li>
      </ul>
      <button onClick={() => handleTestUseState(1)}>test</button>
      <button onClick={() => handleTestUseState(0)}>test</button>
    </div>
  )
}


export default Index
