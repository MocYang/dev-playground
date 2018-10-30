import React, { Component } from 'react'

export default class NormalClassExample extends Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  render () {
    const {
      count
    } = this.state
    return (
      <section>
        <h2>counter with normal class</h2>
        <p>you click {count} times</p>
        <button onClick={() => this.setState({count: count + 1})}>
          count add
        </button>
      </section>
    )
  }
}
