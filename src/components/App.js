import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Main from './Main/Main.container';


class App extends Component {
  render() {
    return (
    <Router>
      <div className="App">
        <Route path="/" component={Main}/>
      </div>
    </Router>
    );
  }
}

export default App;
