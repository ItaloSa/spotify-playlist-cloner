import React, { Component } from 'react';
import './Loading.css';
import LoadingIcon from './LoadingIcon';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="loading">
        <div className="loading-progress" style={{ height: this.props.progress + 'vh' }}></div>
        <div className="loading-content">
          <div className="loading-icon">
            <LoadingIcon />
          </div>
          <p>{ this.props.text }</p>
        </div>
      </div>
    );
  }
}

export default Loading;
