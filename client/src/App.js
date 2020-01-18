import React from 'react';
import { Route, Switch } from "react-router-dom"
import Landing from "./Landing"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
