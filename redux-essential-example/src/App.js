import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PostsList from './features/posts/PostsList'
import { AddPostForm } from "./features/posts/AddNewPost"
import {SinglePostPage} from "./features/posts/SinglePostPage"
import {EditPostForm} from "./features/posts/EditPostForm"
import NavBar from './app/NavBar'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />

        <Switch>
          <Route exact path={'/'}>
            <div>Hello Redux</div>
          </Route>

          <Route exact path={'/posts'}>
            <AddPostForm />
            <PostsList />
          </Route>

          <Route exact path={'/posts/:id'} component={SinglePostPage} />
          <Route exact path={'/posts/edit/:id'} component={EditPostForm} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
