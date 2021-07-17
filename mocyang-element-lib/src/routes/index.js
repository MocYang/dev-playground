/**
 * @Author: yangqixin
 * @TIME: 7/11/21 10:38 PM
 * @FILE: index.js
 * @Email: 958292256@qq.com
 */

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import App from '../pages/home/App'

function Index() {
  return (
    <Router>
      <Switch>
        <Route exact path={'/'}>
          <App />
        </Route>
      </Switch>
    </Router>
  )
}

export default Index
