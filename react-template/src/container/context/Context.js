import React, { Component } from 'react'
import { ThemeContext, theme } from './theme'
import ThemeButton from './ThemeButton'
const ThemeProvider = ThemeContext.Provider
const ThemeToggle = (props) => {
  return (
    <ThemeButton />
  )
}

export default class Context extends Component {
  constructor (props) {
    super(props)
    this.state = {
      theme: theme.dark
    }
    this.handleThemeChange = this.handleThemeChange.bind(this)
  }
  handleThemeChange () {
    this.setState(prevState => ({
      theme: prevState.theme === theme.dark ? theme.light : theme.dark
    }))
  }
  render () {
    return (
      <div className="page page-context">
        <h1>context</h1>
        <button  onClick={this.handleThemeChange}>toggle theme</button>
        <ThemeProvider value={this.state.theme}>
          <ThemeToggle />
        </ThemeProvider>
      </div>
    )
  }
}

