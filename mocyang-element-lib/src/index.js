import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import App from './routes/index'
import { store } from './app/store'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ul className="nav">
        <li className={'nav_link'}>
          <Link to={'/'}>Home</Link>
        </li>
        <li className={'nav_link'}>
          <Link to={'/blog'}>blog</Link>
        </li>
        <li className={'nav_link'}>
          <Link to={'/about'}>about</Link>
        </li>
      </ul>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
