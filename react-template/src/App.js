import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import './assets/styles/share.scss'
import './assets/styles/style.scss'
import Index from './container/Index'
import Hooks from './container/Hooks'
import RenderProps from './container/RenderProps'
import NormalClass from './container/NormalClass'
import Carousel from './container/Carousel'
import Context from './container/context/Context'
import Header from './components/Header'
const App = () => (
  <Router>
    <React.Fragment>
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
    </React.Fragment>
  </Router>
)

export default App
