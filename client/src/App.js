import React from 'react';
import { Route, Switch } from "react-router-dom"
import { store } from "./store"
import NewBlog from "./pages/NewBlog"
import EditBlog from "./pages/EditBlog"
import ShowBlog from "./pages/ShowBlog"
import DeleteBlog from "./pages/DeleteBlog"
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
        <Route exact path="/blog/main">
          <MainBlogPage />
        </Route>
        <Route exact path="/blog/new">
          <NewBlog />
        </Route>
        <Route exact path="/blog/edit/:id" component={EditBlog} />
        <Route exact path="/blog/show/:id" component={ShowBlog} />
        <Route exact path="/blog/delete/:id" component={DeleteBlog} />
      </Switch>
    </div>
  );
}

export default App;
