import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import swal from 'sweetalert';

import Loading from './Loading/LoadingContainer';

class Clone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Cloning playlist...',
      percentage: 0,
      playlist: this.props.location.state.playlist,
      tracks: [],
      uris: []
    }

    this.http = Axios.create({
      baseURL: 'https://api.spotify.com/v1/',
      headers: {
        Authorization: `${this.props.authData.tokenType} ${this.props.authData.accessToken}`
      }
    });

    this.clonePlaylist();
  }

  clonePlaylist = async () => {
    try {
      console.log(this.state);
      const user = await this.currentUserData();
      const playlist = await this.playlist(this.state.playlist);

      const tracks = await this.playlistTracks(this.state.playlist);
      await this.addTracksToState(tracks);
      console.log(user);

      const playlistClone = await this.createPlaylist(user.id, playlist);
      await this.getTracksURIs();

      await this.addTracksToPlaylist(playlistClone.id, playlistClone.external_urls.spotify)
    } catch (err) {
      console.log(err);
    }
  }

  currentUserData = async () => {
    try {
      const user = await this.http.get(`/me`);
      console.log('USER', user);
      this.setState({ percentage: this.state.percentage + 5 });
      return user.data;
    } catch (err) {
      swal('Ops! ☹️', 'An error has occurred.', 'error');
      console.log(err);
    }
  }

  playlist = async playlistId => {
    try {
      const playlist = await this.http.get(`/playlists/${playlistId}`);
      console.log('PLAYLIST', playlist);
      this.setState({ percentage: this.state.percentage + 10 });
      return playlist.data;
    } catch (err) {
      swal('Ops! ☹️', 'An error has occurred.', 'error');
      console.log(err);
    }
  }

  playlistTracks = async playlistId => {
    this.setState({ message: 'Searching tracks...' });
    try {
      let response = await this.http.get(`/playlists/${playlistId}/tracks`);
      const tracks = response.data.items;
      console.log('TRACKS', response);

      while (response.data.next) {
        response = await this.http.get(response.data.next);
        response.data.items.forEach(item => tracks.push(item));
        console.log('TRACKS Next', response);
      }

      this.setState({ percentage: this.state.percentage + 15 });
      return tracks;
    } catch (err) {
      swal('Ops! ☹️', 'An error has occurred.', 'error');
      console.log(err);
    }
  }

  addTracksToState = async tracks => {
    this.setState({ message: 'Saving tracks...' });
    const value = 25 / tracks.length;
    await this.asyncForEach(tracks, async track => {
      await this.delay(25);
      this.setState({
        tracks: [...this.state.tracks, track],
        percentage: this.state.percentage + value
      });
    });
  };

  createPlaylist = async (userId, playlist) => {
    this.setState({ message: 'Creating playlist...' });
    try {
      const data = this.playlistPreferences(playlist);
      const playlistClone = await this.http.post(`/users/${userId}/playlists`, data);
      this.setState({ percentage: this.state.percentage + 10 });
      console.log('NEW PLAYLIST', playlistClone);
      return playlistClone.data;
    } catch (err) {
      swal('Ops! ☹️', 'An error has occurred.', 'error');
      console.log(err);
    }
  }

  getTracksURIs = async () => {
    this.setState({ message: 'Preparing tracks...' });
    const value = 20 / this.state.tracks.length;
    console.log('Tracks State', this.state.tracks);
    await this.asyncForEach(this.state.tracks, async track => {
      await this.delay(25);
      let uri = track.track.uri.indexOf(':track:') > 0 ? track.track.uri : null;
      this.setState({
        uris: uri ? [...this.state.uris, uri] : this.state.uris,
        percentage: this.state.percentage + value
      });
    });
  };

  makeQueue = () => {
    const uris = this.state.uris;
    const pages = Math.ceil(uris.length / 100);
    const array = [];

    for (let i = 0; i < pages; i++) {
      array.push(uris.splice(0, 100));
    }

    return array;
  };

  addTracksToPlaylist = async (playlistId, playlistURL) => {
    this.setState({ message: 'Adding tracks to playlist...' });
    try {
      const uris = this.makeQueue();
      const value = 15 / uris.length;
      await this.asyncForEach(uris, async arr => {
        console.log('Each URIS:', arr);
        await this.http.post(`/playlists/${playlistId}/tracks`, { uris: arr });
        this.setState({ percentage: this.state.percentage + value });
      });

      swal('Yeah! 👏', 'Playlist cloned with success!', 'success').then(() => {
        this.setState({ playlist: '' });
        window.open(playlistURL, '_blank');
      });
    } catch (err) {
      swal('Ops! ☹️', 'An error has occurred.', 'error');
      console.log(err);
    }
  };

  playlistPreferences(playlist) {
    return {
      name: playlist.name,
      description: 'Clone by Spotify Playlist Cloner 🎶'
    }
  }

  delay = time => new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });

  asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  };

  render() {
    return (
      this.state.playlist.length ? (
        <Loading progress={ this.state.percentage } text={ this.state.message } />
      ) : window.location.href = '/'
    );
  }

}

const mapStateToProps = store => ({
  authData: store.authState
});

export default connect(mapStateToProps)(Clone);
