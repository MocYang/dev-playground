import React, { Suspense, lazy } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import './assets/styles/share.scss'
import './assets/styles/style.scss'
import Header from './components/Header'

const Index = lazy(() => import('./container/Index'))
const Hooks = lazy(() => import('./container/Hooks'))
const RenderProps = lazy(() => import('./container/RenderProps'))
const Carousel = lazy(() => import('./container/Carousel'))
const Context = lazy(() => import('./container/context/Context'))
const NormalClass = lazy(() => import('./container/NormalClass'))

const App = () => (
  <Router>
    <Suspense fallback={<div className='page'>loading</div>}>
      <Header />
      <Switch>
        <Route exact path='/' component={props => <Index {...props} />} />
        <Route path='/hooks' component={props => <Hooks {...props} />} />
        <Route path='/carousel' component={props => <Carousel {...props} />} />
        <Route path='/normal-class' component={props => <NormalClass {...props} />} />
        <Route path='/render-props' component={props => <RenderProps {...props} />} />
        <Route path='/context' component={props => <Context {...props} />} />
        <Route component={(() => <div>not match</div>)} />
      </Switch>
    </Suspense>
  </Router>
)

export default App
