/**
 * @Author: yangqixin
 * @TIME: 5/26/21 8:00 PM
 * @FILE: Test.js
 * @Email: 958292256@qq.com
 */
import React, {useEffect} from 'react'
const Test = () => {
  useEffect(() => {
    console.log(' Test Component did mount.')
  }, [])
  return (
    <div>
      <h1>Test Component</h1>
    </div>
  )
}

export default Test
