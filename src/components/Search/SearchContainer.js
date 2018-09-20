import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';
import classNames from 'classnames';
import DebounceInput from 'react-debounce-input';
import isURL from 'is-url';
import { connect } from 'react-redux';
import './Search.css';

import Playlist from '../Playlist/Playlist';
import Loading from '../Loading/LoadingContainer';
import SearchLoading from './SearchLoading';

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      search: '',
      loading: false,
      error: false,
      playlists: [],
      playlist: ''
    };

    this.http = Axios.create({
      baseURL: 'https://api.spotify.com/v1/',
      headers: {
        Authorization: `${this.props.authData.tokenType} ${this.props.authData.accessToken}`
      }
    });

    this.clearURL = url => {
      let start = 0;
      let end = url.length;

      if (url.indexOf('?si=') > 0) {
        end = url.indexOf('?si=');
        url = url.slice(0, end);
      }

      start = url.indexOf('/playlist/') + '/playlist/'.length;

      return url.slice(start, end);
    };
  }

  searchPlaylist = async name => {
    this.setState({ loading: true });
    try {
      const playlists = await this.http.get(`search?q=${name}&type=playlist&limit=15`);
      this.setState({ playlists: playlists.data.playlists.items });

      if (!playlists.data.playlists.items.length) {
        swal('Ops! :(', 'Playlists not found.', 'error');
      }
    } catch (err) {
      swal('Ops! :(', 'An error has occurred.', 'error');
      console.log(err);
    }
    this.setState({ loading: false });
  };

  getPlaylistByURL = async url => {
    this.setState({ loading: true });
    const newURL = this.clearURL(url);
    try {
      const playlist = await this.http.get(`playlists/${newURL}`);
      this.setState({ playlists: [ playlist.data ] });

      if (![playlist.data].length) {
        swal('Ops! :(', 'Playlist not found.', 'error');
      }
    } catch (err) {
      swal('Ops! :(', 'An error has occurred.', 'error');
      console.log(err);
    }
    this.setState({ loading: false });
  };

  handleChange = event => {
    let text = event.target.value;
    this.setState({ search: text, error: false, playlists: [] });

    if (!text.length) {
      this.setState({ playlists: [] });
      return;
    }

    if (!isURL(text)) {
      this.searchPlaylist(text);
    } else {
      this.getPlaylistByURL(text);
    }
  };

  handleClick = event => {
    const target = event.target;
    const element = target.closest('.playlist-card');
    this.setState({ playlist: element.getAttribute('data-id') });
  };

  render() {
    return (
      this.state.playlist.length ? (
        <Loading progress={30} text="Cloning playlist..." />
      ) : (
        <div>
          <div className={classNames(
            "header",
            "animated fadeInDown fast",
            this.state.playlists.length ? "show" : ""
          )}>
            <p><span role="img" aria-label="musical note">🎶</span> Spotify Playlist Cloner</p>
            <div className="search">
              <DebounceInput
                minLength={2}
                debounceTimeout={350}
                type="search"
                onChange={ this.handleChange }
                placeholder="Search playlist name or URL"
                disabled={ this.state.loading }
              />
            </div>
          </div>

          <div className={classNames(
            "search-loading",
            this.state.loading ? "show" : ""
          )}>
            <SearchLoading />
          </div>

          <Playlist data={ this.state.playlists } onClick={ this.handleClick } />
        </div>
      )
    );
  }
}

const mapStateToProps = store => ({
  authData: store.authState
});

export default connect(mapStateToProps)(SearchContainer);
