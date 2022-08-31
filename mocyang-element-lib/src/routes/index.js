/**
 * @Author: yangqixin
 * @TIME: 7/11/21 10:38 PM
 * @FILE: index.js
 * @Email: 958292256@qq.com
 */

import { Switch, Route, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import App from '../pages/home/App'
import Blog from '../pages/blog/Blog'
import About from '../pages/about/About'

function Index() {
  const location = useLocation()
  return (
    <TransitionGroup mode={'out-in'}>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={1000}
        in={true}
      >
        <Switch location={location}>
          <Route exact path="/" render={() => <App/>}/>
          <Route exact path="/blog" render={() => <Blog/>}/>
          <Route exact path="/about" render={() => <About/>}/>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default Index
