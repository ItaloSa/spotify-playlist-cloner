import React, { Component } from 'react';
import classNames from 'classnames';
import DebounceInput from 'react-debounce-input';
import './Search.css';

import Playlist from '../Playlist/Playlist';

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      search: '',
      loading: false,
      error: false,
      playlists: [],
      examplePlaylists: [
        {
          image: 'https://mosaic.scdn.co/640/19a246a2d394ee49a2a021de8206c97a860a0222ab37575ba703a95760cec2e350b05b90f339b59cdb55d945b33d869b32936e8aca1322de86d79e29eb0411e7cbd72e7754e5eb17615ab0ae71da368b',
          title: 'Só Pedrada 👽',
          author: 'adriel1303',
          followers: 3
        },
        {
          image: 'https://charts-images.scdn.co/VIRAL_GLOBAL_DEFAULT.jpg',
          title: 'Global Viral 50',
          author: 'spotifycharts',
          followers: 1033192
        },
        {
          image: 'https://pl.scdn.co/images/pl/default/2b42d0ae2fd62fd30604b42f50934a3ad5fb7bb2',
          title: 'SÓ TRACK BOA',
          author: 'nuwaveselects',
          followers: 7579
        },
        {
          image: 'https://i.scdn.co/image/75b268ded32d739bd7d14ce37b7a035b307ab3a6',
          title: 'mint BR',
          author: 'Spotify',
          followers: 344942
        }
      ]
    };
  }

  changePlaylists = total => {
    let playlists = this.state.examplePlaylists;

    if (total) {
      this.setState({ playlists: playlists });
    } else {
      this.setState({ playlists: [] });
    }
  };

  handleChange = event => {
    this.setState({ search: event.target.value, error: false });
    this.changePlaylists(event.target.value.length);
  };

  render() {
    return (
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
              placeholder="Search playlist"
            />
          </div>
        </div>

        <Playlist data={ this.state.playlists } />
      </div>
    );
  }
}

export default SearchContainer;
