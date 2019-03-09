import React, { Component, Fragment } from 'react'
import Value from '../components/Value'
import Page from './utils/Page'

export default class PageValue extends Component {
  state = {
    name: '',
    age: ''
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleAgeChange = (e) => {
    this.setState({
      age: e.target.value
    })
  }

  submit = () => {

  }

  render () {
    return (
      <Page>
        <Value initial={this.state.name} onChange={this.handleNameChange}>
          {({ set, reset, value }) => (
            <Fragment>
              <input type="text" value={value} onChange={set}/>
              <button className="btn__reset" onClick={reset}>reset value</button>
            </Fragment>
          )}
        </Value>

        <button className="btn__submit" onClick={this.submit}>
          提交
        </button>
      </Page>
    )
  }
}
