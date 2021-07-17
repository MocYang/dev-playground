/**
 * @Author: yangqixin
 * @TIME: 7/11/21 10:38 PM
 * @FILE: index.js
 * @Email: 958292256@qq.com
 */

import { Link, Switch, Route, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import App from '../pages/home/App'
import Blog from '../pages/blog/Blog'
import About from "../pages/about/About"

function Index() {
  const location = useLocation()
  return (
    <TransitionGroup>
      <CSSTransition
        key={ location.key }
        classNames="fade"
        timeout={ 300 }
        in={true}
      >
        <Switch location={ location }>
          <Route exact path="/"><App/></Route>
          <Route exact path="/blog"><Blog/></Route>
          <Route exact path="/about"><About/></Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default Index
