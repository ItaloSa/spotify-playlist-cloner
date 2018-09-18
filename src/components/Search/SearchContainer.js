import React, { Component } from 'react';
import Axios from 'axios';
import classNames from 'classnames';
import DebounceInput from 'react-debounce-input';
import isURL from 'is-url';
import './Search.css';

import Playlist from '../Playlist/Playlist';
import Loading from '../Loading/LoadingContainer';

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
    try {
      const playlists = await this.http.get(`search?q=${name}&type=playlist&limit=15`);
      this.setState({ playlists: playlists.data.playlists.items });
    } catch (err) {
      alert('Error!');
      console.log(err);
    }
  };

  getPlaylistByURL = async url => {
    const newURL = this.clearURL(url);
    try {
      const playlist = await this.http.get(`playlists/${newURL}`);
      this.setState({ playlists: [ playlist.data ] });
    } catch (err) {
      alert('Error!');
      console.log(err);
    }
  };

  handleChange = event => {
    let text = event.target.value;
    this.setState({ search: text, error: false });

    if (!text.length)
      this.setState({ playlists: [] });

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
            this.state.search.length ? "show" : ""
          )}>
            <p>🎶 Spotify Playlist Cloner</p>
            <div className="search">
              <DebounceInput
                minLength={2}
                debounceTimeout={300}
                type="search"
                onChange={ this.handleChange }
                placeholder="Search playlist name or URL"
              />
            </div>
          </div>

          <Playlist data={ this.state.playlists } onClick={ this.handleClick } />
        </div>
      )
    );
  }
}

export default SearchContainer;
