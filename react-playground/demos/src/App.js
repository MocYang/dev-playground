import React, { Component } from 'react'

import ProfileFunc from './components/hooks/ProfilePage'
import ProfileClass from './components/class/ProfilePage'
import './App.css'

class App extends Component {
  state = {
    user: '',
    userList: [
      { id: 1, name: '虞爸爸' },
      { id: 2, name: '虞妈妈' },
      { id: 3, name: '小可爱' },
    ]
  }

  handleToggleUser = (e) => {
    this.setState({
      user: e.target.value
    })
  }

  render () {
    const state = this.state
    const user = state.user
    const userList = state.userList
    console.log(user, 'in App')
    return (
      <div className="App">
        <h2>Choose a master:
          <select onChange={this.handleToggleUser} value={user}>
            {
              userList.map(u => (
                <option value={u.name} key={u.id}>{u.name}</option>
              ))
            }
          </select>

          <p>welcome {user}</p>

          <p>
            <ProfileFunc user={user}/> (func)
          </p>
          <p>
            <ProfileClass user={user}/> (class)
          </p>
        </h2>
      </div>
    )
  }
}

export default App
