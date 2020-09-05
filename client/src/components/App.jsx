import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import AddPost from './pages/AddPost'
import Secret from './pages/Secret'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Appbar from './Appbar'
import Posts from './pages/Posts'

export default function App() {
  return (
    <div className="App">
      <Appbar>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/posts" component={Posts} />
          <Route path="/add-post" component={AddPost} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/secret" component={Secret} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </Appbar>
    </div>
  )
}
