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
    value: ''
  }

  static getDerivedStateFromProps (props, state) {
    if (props.initial !== state.value) {
      return {
        value: props.initial
      }
    }
  }

  _set = (e) => {
    console.log('_set emit', e)
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
