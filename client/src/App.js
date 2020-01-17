import React from 'react';
import { Route, Switch } from "react-router-dom"
import Login from "./Login"
import Landing from "./Landing"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
