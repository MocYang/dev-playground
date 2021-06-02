/**
 * @Author: yangqixin
 * @TIME: 5/29/21 4:47 PM
 * @FILE: useEffectAsync.js
 * @Email: 958292256@qq.com
 */

import React, {useState, useEffect} from 'react'

const Com = () => {
  const [msg, setMsg] = useState('')
  const num = Math.round(10)
  if (num > 5) {
    useEffect(() => {
      console.log('this will throw error')
    },[])
  }
  return (
    <div>
      <h1>useEffect</h1>
      <h2>{msg}</h2>
    </div>
  )
}

export default Com

