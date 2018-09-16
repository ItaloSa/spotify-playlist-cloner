import React, { Component } from 'react';
import abbreviate from 'number-abbreviate';
import './Playlist.css';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = event => {
    console.log('Playlist!');
  };

  render() {
    return (
      <div className="container playlists">
        <div className="row">
          {this.props.data.map(playlist => (
            <div className="col-xs-12 col-md-6 col-lg-4 col-xl-3" onClick={ this.handleClick }>
              <div className="playlist-card animated fadeIn">
                <img src={ playlist.image } alt="Playlist cover" />
                <h3>{ playlist.title }</h3>
                <p>By { playlist.author }</p>
                <p className="followers">{ abbreviate(playlist.followers, 2) } followers</p>

                <div className="playlist-select">
                  <i className="fa fa-plus-circle"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Playlist;
