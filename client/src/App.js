import React from 'react';
import { Route, Switch } from "react-router-dom"
import { store } from "./store"
import New from "./pages/New"
import Landing from "./pages/Landing"
import MainBlogPage from "./pages/MainBlogPage"

function App() {

  const { isLoggedIn } = store.getState()
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <MainBlogPage /> : <Landing />}
        </Route>
        <Route exact path="/blog/new">
          <New />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
