import React from 'react'
import Seperator from '../components/Seperator'
import HookExample from '../components/HookExample'

const Hooks = (props) => {
  console.log(props)
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

export default Hooks
