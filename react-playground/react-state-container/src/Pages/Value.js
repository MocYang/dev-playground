import React, { Component, Fragment } from 'react'
import Value from '../components/Value'
import Page from './utils/Page'

export default class PageValue extends Component {
  state = {
    info: {},
  }

  submit = () => {

  }

  render () {
    return (
      <Page>
        <Value initial={1}>
          {({ set, reset, value }) => (
            <Fragment>
              <select name="" id="" value={value} onChange={set}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
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
