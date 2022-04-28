import React from 'react';
import './App.css';
import SearchResult from '../SearchResult/SearchResult';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      searchResults : [],
      playlistName: 'classics',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks.filter(unwantedTrack => unwantedTrack.id !== track.id)
    this.setState({playlistTracks: tracks})
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist(){
    let trackURIs = [];
    this.playlistTracks.forEach(track => trackURIs.push(track.uri))
  }

  search(term){
    console.log(term);
  }

  render() { 
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
      <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResult 
            searchResults={this.state.searchResults}
            onAdd={this.addTrack}
          />
          <Playlist 
            playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onChangeName={this.updatePlaylistName}
            onSave={this.savePlaylist}
          />
        </div>
      </div>
    </div>
    );
  }
}
 
export default App;
