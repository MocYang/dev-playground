import React, { Component } from 'react';
import './App.css';
import Seperator from './components/Seperator'
import HookExample from './components/HookExample'
import NormalClassExample from './components/NormalClassExample'
class App extends Component {
  render() {
    return (
      <div className="App">
        <NormalClassExample />
        <Seperator />
        <HookExample title={'hook example 1'}/>
        <Seperator />
        <HookExample title={'hook example 2'}/>
        <Seperator/>
      </div>
    );
  }
}

export default App;
