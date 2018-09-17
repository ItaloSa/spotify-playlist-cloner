import React, { Component } from 'react';
import { connect } from 'react-redux';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.data = props.authData;
    console.log(props);
  }

  render() {
    return null;
  }

}

const mapStateToProps = store => ({
  authData: store.authState
});

export default connect(mapStateToProps)(Auth);
