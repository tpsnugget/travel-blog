import React from 'react';
import { Route, Switch } from "react-router-dom"
import { store } from "./store"
import NewBlog from "./pages/NewBlog"
import ShowBlog from "./pages/ShowBlog"
import Landing from "./pages/Landing"
import Profile from "./pages/Profile"
import MainBlogPage from "./pages/MainBlogPage"

function App() {

  const { isLoggedIn, hasProfile } = store.getState()

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          {isLoggedIn && !hasProfile && <Profile />}
          {isLoggedIn && hasProfile && <MainBlogPage />}
          {!isLoggedIn && <Landing />}
        </Route>
        <Route exact path="/blog/new">
          <NewBlog />
        </Route>
        <Route exact path="/blog/show/:id" component={ShowBlog} />
      </Switch>
    </div>
  );
}

export default App;
