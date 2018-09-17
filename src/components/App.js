import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Main from './Main/Main.container';
import Login from './Auth/Auth';

class App extends Component {
  render() {
    return (
    <Router>
      <div className="App">
        <Route path="/" component={Main}/>
        <Route path="/login" component={Login} />
      </div>
    </Router>
    );
  }
}

export default App;
