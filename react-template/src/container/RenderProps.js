import React from 'react'
import Mouse from '../modules/RenderProps/Mouse'

const RenderProps = () => {
  return (
    <div className="page">
      <Mouse>
        {({x, y}) => (
          <div style={{width: '100%', height: '200px'}}>
            <p>x-{x}</p>
            <p>y-{y}</p>
          </div>
        )}
      </Mouse>
    </div>
  )

}
export default RenderProps
