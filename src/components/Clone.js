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
      this.addTracksToState(tracks.data.items);
      console.log(user);

      const playlistClone = await this.createPlaylist(user.id, playlist);
      this.getTracksURIs();

      await this.addTracksToPlaylist(playlistClone.id, playlistClone.external_urls.spotify)
    } catch (err) {
      console.log(err);
    }
  }

  currentUserData = async () => {
    try {
      const user = await this.http.get(`/me`);
      console.log('USER', user);
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
      return playlist.data;
    } catch (err) {
      swal('Ops! ☹️', 'An error has occurred.', 'error');
      console.log(err);
    }
  }

  playlistTracks = async playlistId => {
    this.setState({ message: 'Searching tracks...' });
    try {
      const tracks = await this.http.get(`/playlists/${playlistId}/tracks`);
      this.setState({ percentage: this.state.percentage + 10 });
      console.log('TRACKS', tracks);
      return tracks;
    } catch (err) {
      swal('Ops! ☹️', 'An error has occurred.', 'error');
      console.log(err);
    }
  }

  addTracksToState = (tracks) => {
    this.setState({ message: 'Saving tracks...' });
    const value = 40 / tracks.length;
    tracks.forEach(track => {
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

  getTracksURIs = () => {
    this.setState({ message: 'Preparing tracks...' });
    const value = 40 / this.state.tracks.length;
    this.state.tracks.forEach(track => {
      this.setState({
        uris: [...this.state.uris, track.track.uri],
        percentage: this.state.percentage + value
      });
    });
  };

  addTracksToPlaylist = async (playlistId, playlistURL) => {
    this.setState({ message: 'Adding tracks to playlist...' });
    try {
      const response = await this.http.post(`/playlists/${playlistId}/tracks`, { uris: this.state.uris });
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
