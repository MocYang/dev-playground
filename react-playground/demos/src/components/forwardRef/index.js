/**
 * @Author: yangqixin
 * @TIME: 5/25/21 10:01 PM
 * @FILE: index.js
 * @Email: 958292256@qq.com
 */

import React from 'react'


const MyButton = (props) => {
  return (
    <div>
      <button ref={props.ref}>{props.children}</button>
    </div>
  )
}





