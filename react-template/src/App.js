import React, { Component } from 'react'
import './App.css'
import Seperator from './components/Seperator'
import HookExample from './components/HookExample'
import NormalClassExample from './components/NormalClassExample'
import Mouse from './modules/RenderProps/Mouse'

class App extends Component {
  render () {
    return (
      <div className="App">
        <NormalClassExample />
        <Seperator />
        <HookExample title={'hook example 1'} />
        <Seperator />
        <HookExample title={'hook example 2'} />
        <Seperator />
        <Mouse>
          {({x, y}) => (
            <div style={{width: '100%', height: '200px'}}>
              <p>x-{x}</p>
              <p>y-{y}</p>
            </div>
          )}
        </Mouse>
      </div>
    )
  }
}

export default App
