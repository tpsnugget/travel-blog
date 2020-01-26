import React from 'react';
import { Route, Switch } from "react-router-dom"
import NewBlog from "./pages/NewBlog"
import EditBlog from "./pages/EditBlog"
import ShowBlog from "./pages/ShowBlog"
import DeleteBlog from "./pages/DeleteBlog"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
import MainBlogPage from "./pages/MainBlogPage"

function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/blog/new" component={NewBlog} />
        <Route exact path="/blog/main" component={MainBlogPage} />
        <Route exact path="/blog/edit/:id" component={EditBlog} />
        <Route exact path="/blog/show/:id" component={ShowBlog} />
        <Route exact path="/blog/delete/:id" component={DeleteBlog} />
      </Switch>
    </div>
  );
}

export default App;
