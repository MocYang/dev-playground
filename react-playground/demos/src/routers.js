import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

// import Main from './pages/Main'
// import Main from './pages/SetIntervalWithHooks'
// import Main from './pages/Modal'
// import Main from './pages/TestMultiSetUseState'
// import Main from './pages/IframeNoves'
import PageHome from './pages/Main'
// import PageCircleAnimate from './pages/circle-animate'
import TestPureComponent from './components/PureComponent'
import TestMemo from './components/memo'
import ForwardedButton from './components/forwardRef'
import LazyComponent from './components/lazy/index'
import UseEffectAsync from './components/hooks/useEffectAsync'
import InputDebounce from './pages/input_debounce/Input_Debounce'
const App = () => {
  return (
    <Router>
      <Route exact path={'/'}>
        <PageHome />
      </Route>

      {/*<Route path={'/lazyload_js'}>*/}
      {/*  <PageLazyLoad />*/}
      {/*</Route>*/}

      {/*<Route path={'/circle-animate'}>*/}
      {/*  <PageCircleAnimate />*/}
      {/*</Route>*/}
      <Route exact path={'/pure_component'}>
        <TestPureComponent />
      </Route>

      <Route exact path={'/memo'}>
        <TestMemo />
      </Route>

      <Route exact path={'/forward_ref'}>
        <ForwardedButton />
      </Route>

      <Route exact path={'/lazy_suspense'}>
        <LazyComponent />
      </Route>

      <Route exact path={'/useEffect'}>
        <UseEffectAsync />
      </Route>

      <Route exact path={'/input_debounce'}>
        <InputDebounce />
      </Route>
    </Router>
  )
}


export default App
