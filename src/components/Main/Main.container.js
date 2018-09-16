import React, { Component } from 'react';
import ButtonSmall from '../Button/Button';

class MainConatiner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      tokenType: null,
      error: null
    }

    this.authUrl = "https://accounts.spotify.com/authorize?client_id=d253ce6ec3ed4723b2d6be092f8a387e&redirect_uri=http:%2F%2Flocalhost:3000&scope=user-read-private%20user-read-email&response_type=token&state=123";

    this.check();

  }

  check() {
    console.log(this.props);
  }

  isAuth() {
    return this.state.accessToken != null;
  }

  render() {
    return (
      this.isAuth() ? null : (
        <a href={this.authUrl}>
          <ButtonSmall title="Login on Spotify"></ButtonSmall>
        </a>
      )
    );
  }

}

export default MainConatiner;
