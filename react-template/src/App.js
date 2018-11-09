import React, { Suspense, lazy } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import './assets/styles/share.scss'
import './assets/styles/style.scss'
import Header from './components/Header'

// import Index from './container/Index'
// import Hooks from './container/Hooks'
// import RenderProps from './container/RenderProps'
import NormalClass from './container/NormalClass'
// import Carousel from './container/Carousel'
// import Context from './container/context/Context'

const Index = lazy(() => import('./container/Index'))
const Hooks = lazy(() => import('./container/Hooks'))
const RenderProps = lazy(() => import('./container/RenderProps'))
const Carousel = lazy(() => import('./container/Carousel'))
const Context = lazy(() => import('./container/context/Context'))
const App = () => (
  <Router>
    <Suspense fallback={<div className='page'>loading</div>}>
      <Header />
      <Switch>
        <Route exact path='/' component={Index} />
        <Route path='/hooks' component={Hooks} />
        <Route path='/carousel' component={Carousel} />
        <Route path='/normal-class' component={NormalClass} />
        <Route path='/render-props' component={RenderProps} />
        <Route path='/context' component={Context} />
        <Route component={(() => <div>not match</div>)} />
      </Switch>
    </Suspense>
  </Router>
)

export default App
