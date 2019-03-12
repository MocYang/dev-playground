import React, { Component } from 'react'

export default class ProfilePage extends Component {
  showMessage = (user) => {
    const name = user || this.props.user
    console.log(name, 'in class')
    alert('Followed ' + name)
  }

  handleClick = () => {
    setTimeout(this.showMessage, 3000)
  }

  render () {
    // capture props
    // const props = this.props
    //
    // const showMessage = (user) => {
    //   const name = user || props.user
    //   console.log(name, 'in class')
    //   alert('Followed ' + name)
    // }
    //
    // const handleClick = () => {
    //   setTimeout(showMessage, 3000)
    // }
    return <button onClick={this.handleClick}>Follow {this.props.user}</button>
  }
}
