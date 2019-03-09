import { Component } from 'react'
import { renderProps, noop } from "../utils";

/**
 * props:
 *  initial - any
 *  onChange - func
 *  children - func(state) | render prop
 *
 *  children props:
 *    value -any
 *    set - func
 *    reset - func
 */
class Value extends Component {
  static defaultProps = {
    initial: 0,
    onChange: noop
  }

  state = {
    value: this.props.initial
  }

  _set = (updater, cb = noop) => {
    console.dir(updater)
    const onChange = this.props.onChange || noop
    this.setState(
      typeof updater === 'function'
        ? state => ({value: updater(state.value)})
        : {value: updater},
      () => {
        onChange(this.state.value)
        cb()
      }
    )
  }

  _reset = (e) => {
    console.log('_reset emit', e)
  }

  render () {
    return renderProps(this.props, {
      value: this.state.value,
      set: this._set,
      reset: this._reset
    })
  }
}

export default Value
