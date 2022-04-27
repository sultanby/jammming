import React from 'react';
import './App.css';
import SearchResult from '../SearchResult/SearchResult';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      searchResults : [],
      playlistName: 'classics',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      tracks.push(track);
      this.setState({playlistTracks: tracks})
    }
  }
  
  render() { 
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
      {/* Add a SearchBar component */}
        <div className="App-playlist">
          <SearchResult 
            searchResults={this.state.searchResults}
            onAdd={this.addTrack}
          />
          <Playlist 
            playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks}
          />
        </div>
      </div>
    </div>
    );
  }
}
 
export default App;
