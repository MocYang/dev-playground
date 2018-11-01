import React, { Component } from 'react'
import Mouse from '../modules/RenderProps/Mouse'

export default class RenderProps extends Component {
  render () {
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
}
