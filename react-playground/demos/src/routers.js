import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

// import Main from './pages/Main'
// import Main from './pages/SetIntervalWithHooks'
// import Main from './pages/Modal'
// import Main from './pages/TestMultiSetUseState'
// import Main from './pages/IframeNoves'
import PageHome from './pages/Main'
import PageLazyLoad from './pages/LazyLoad'

const App = () => {
  return (
    <Router>
      <Route exact path={'/'}>
        <PageHome />
      </Route>

      <Route path={'/lazyload_js'}>
        <PageLazyLoad />
      </Route>
    </Router>
  )
}


export default App
