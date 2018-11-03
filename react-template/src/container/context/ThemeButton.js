import React, { Component } from 'react'
import {ThemeContext} from './theme'
class ThemeButton extends Component {
  static contextType = ThemeContext
  render () {
    const theme = this.context
    const props = this.props
    return (
      <button
        {...props}
        style={{background: theme.background}}
      >toggle theme</button>
    )
  }
}

export default ThemeButton
