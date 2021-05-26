/**
 * @Author: yangqixin
 * @TIME: 5/26/21 8:00 PM
 * @FILE: index.js
 * @Email: 958292256@qq.com
 */

import React from 'react'
import Test from "./Test";



const LazyTest = React.lazy(() => new Promise((resolve => {
  setTimeout(() =>{
    resolve({
      default: () => <Test />
    })
  }, 2000)
})))

const LazyComponent = () => {
  return (
    <div>
      <React.Suspense fallback={<div>spinning</div>}>
        <LazyTest />
      </React.Suspense>
    </div>
  )
}

export default LazyComponent



