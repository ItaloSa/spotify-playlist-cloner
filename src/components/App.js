import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Main from './Main/MainContainer';
import Auth from './Auth';

class App extends Component {
  render() {
    return (
    <Router>
      <div className="App">
        <Route path="/" component={Main}/>
        <Route path="/auth" component={Auth} />
      </div>
    </Router>
    );
  }
}

export default App;
