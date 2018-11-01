import React, { Component } from 'react'
import Seperator from '../components/Seperator'
import HookExample from '../components/HookExample'
export default class Hooks extends Component {
  render () {
    return (
      <div className={'page'}>
        <Seperator />
        <HookExample title={'hook example 1'} />
        <Seperator />
        <HookExample title={'hook example 2'} />
        <Seperator />
      </div>
    )
  }
}
