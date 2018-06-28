/* eslint-disable-next-line */
import React from 'react'
import ReactDOM from 'react-dom'
import './assets/styles/share.css'
/* eslint-disable-next-line */
import App from './App'
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'))
const rootEl = document.getElementById('root')
if (module.hot) {
  module.hot.accept('./App', () => {
    /* eslint-disable-next-line */
    const NextApp = require('./App').default
    ReactDOM.render(
      <NextApp />,
      rootEl
    )
  })
}
// registerServiceWorker();
