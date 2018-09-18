import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { setAuthData } from '../../actions';
import { bindActionCreators } from 'redux';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.data = props.authData;
    this.authData();
  }

  authData() {
    const hashData = queryString.parse(this.props.location.hash);
    if (hashData.error) {
      console.log("error");
      return;
    }
    console.log('set!');
    this.props.setAuthData(hashData);
    console.log('after', this.props);
  }

  render() {
  const {setAuthData} = this.props;
    return (
      <div>
        <button onClick={() => setAuthData(this.state.inputValue)}>
          Click me!
        </button>
      </div>
    );
  }

}

const mapStateToProps = store => ({
  authData: store.authState
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setAuthData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
