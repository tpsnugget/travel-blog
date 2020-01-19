import React from 'react';
import ReactDOM from 'react-dom';
import { store } from "./store"
import { BrowserRouter as Router } from "react-router-dom"
import './css/index.css';
import App from './App';

const render = () =>

ReactDOM.render(
      <Router>
         <App />
      </Router>
   , document.getElementById('root'));

render()

store.subscribe(render)