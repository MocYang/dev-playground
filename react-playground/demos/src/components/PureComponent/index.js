/**
 * @Author: yangqixin
 * @TIME: 5/25/21 8:24 PM
 * @FILE: index.js
 * @Email: 958292256@qq.com
 */

import React from 'react'

class TestPureComponent extends React.PureComponent {
  constructor () {
    super()
    this.state = {
      data: {
        name: 'no one',
        age: 10000
      }
    }
  }

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    console.log(this.state, nextState)
    console.log(this.state === nextState)
  }

  handleClick = () => {
    const {data} = this.state
    data.age++
    this.setState({data})


    // this.setState((preState, preProps) => ({
    //   data: {
    //     ...preState.data,
    //     age: preState.data.age + 1
    //   }
    // }))
  }

  render () {
    const {
      name,
      age
    } = this.state.data
    return (
      <div>
        <div>name: {name}</div>
        <span>age: {age}</span>
        <div>
          <button onClick={this.handleClick}>click me</button>
        </div>
      </div>
    )
  }
}

export default TestPureComponent
