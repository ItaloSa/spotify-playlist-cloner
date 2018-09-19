import React, { Component } from 'react';
import abbreviate from 'number-abbreviate';
import './Playlist.css';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container playlists">
        <div className="row">
          {this.props.data.map(playlist => (
            <div className="col-xs-12 col-md-4 col-xl-3" key={ playlist.id } onClick={ this.props.onClick }>
              <div className="playlist-card animated fadeIn" data-id={ playlist.id } >
                <div className="playlist-image" style={{ backgroundImage: `url(${playlist.images[0].url})` }}>
                  <div className="playlist-select">
                    <i className="fa fa-plus-circle"></i>
                  </div>
                </div>
                <h3>{ playlist.name }</h3>
                <p>By { playlist.owner.display_name ? playlist.owner.display_name : playlist.owner.id }</p>
                <p className="followers">{ abbreviate(playlist.tracks.total, 1) } tracks</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Playlist;
