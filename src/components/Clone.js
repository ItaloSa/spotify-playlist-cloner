import { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

class Clone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      percentage: 0,
      playlist: this.props.location.state.playlist
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
    console.log(user);
    const playlistClone = await this.createPlaylist(user.id, playlist);
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
      alert('Error!');
      console.log(err);
    }
  }

  playlist = async playlistId => {
    try {
      const playlist = await this.http.get(`/playlists/${playlistId}`);
      console.log('PLAYLIST', playlist);
      return playlist.data;
    } catch (err) {
      alert('Error!');
      console.log(err);
    }
  }

  playlistTracks = async playlistId => {
    this.setState({message: 'Searching tracks...'});
    try {
      const tracks = await this.http.get(`/playlists/${playlistId}/tracks`);
      this.setState({percentage: this.state.percentage + 10});
      console.log('TRACKS', tracks);
      return tracks;
    } catch (err) {
      alert('Error!');
      console.log(err);
    }
  }

  createPlaylist = async (userId, playlist) => {
    try {
      const data = this.playlistPreferences(playlist);
      const playlistClone = await this.http.post(`/users/${userId}/playlists`, data);
      console.log('NEW PLAYLIST', playlistClone);
      return playlistClone.data;
    } catch (err) {
      alert('Error!');
      console.log(err);
    }
  }

  playlistPreferences(playlist) {
    return {
      name: playlist.name,
      description: 'Clone by Spotify Playlist Cloner 🎶'
    }
  }

  render() {
    return (null);
  }

}

const mapStateToProps = store => ({
  authData: store.authState
});

export default connect(mapStateToProps)(Clone);
