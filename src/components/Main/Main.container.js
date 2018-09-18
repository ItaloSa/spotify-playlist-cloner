import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Main.css';

import ButtonSmall from '../Button/Button';

class MainConatiner extends Component {
  constructor(props) {
    super(props);

    this.authUrl = "https://accounts.spotify.com/authorize?client_id=d253ce6ec3ed4723b2d6be092f8a387e&redirect_uri=http:%2F%2Flocalhost:3000%2Fauth&scope=user-read-private%20user-read-email&response_type=token&state=123";

  }

  isAuth() {
    return this.props.authData.accessToken != null;
  }

  login = () => {
    window.location.replace(this.authUrl);
  };

  render() {
    return (
      this.isAuth() ? null : (
        <div className="login">
            <ButtonSmall title="Login on Spotify" onClick={this.login}></ButtonSmall>
        </div>
      )
     );
  }

}

const mapStateToProps = store => ({
  authData: store.authState
});

export default connect(mapStateToProps)(MainConatiner);
