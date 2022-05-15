import React from "react";
import "./App.css";
import SearchResult from "../SearchResult/SearchResult";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import Spotify from "../../util/Spotify";
import PlaylistSearch from "../PlaylistSearch/PlaylistSearch";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "playlist name",
      playlistTracks: [],
      playlistList: [],
      playlistId: "",
      isPlaylist: false,
      isExistingPlaylist: false,
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.getUserPlaylists = this.getUserPlaylists.bind(this);
    this.getUserPlaylistTracks = this.getUserPlaylistTracks.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    } else {
      tracks.push(track);
      this.setState({ playlistTracks: tracks });
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter((unwantedTrack) => unwantedTrack.id !== track.id);
    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    let trackURIs = [];
    this.state.playlistTracks.forEach((track) => trackURIs.push(track.uri));
    if (!this.state.isExistingPlaylist) {
      Spotify.savePlaylist(this.state.playlistName, trackURIs);
    } else {
      Spotify.updatePlaylistItems(
        trackURIs,
        this.state.playlistId,
        this.state.playlistName
      );
    }
  }

  search(term) {
    Spotify.search(term).then((result) => {
      this.setState({ searchResults: result, isPlaylist: false });
    });
  }

  getUserPlaylists() {
    Spotify.getUserPlaylists().then((result) => {
      this.setState({ playlistList: result, isPlaylist: true });
    });
  }

  getUserPlaylistTracks(playlistId, playlistName) {
    Spotify.getPlaylist(playlistId).then((result) => {
      this.setState({
        playlistTracks: result,
        playlistName: playlistName,
        isExistingPlaylist: true,
        playlistId: playlistId,
      });
    });
  }

  clearSearch() {
    this.setState({
      playlistName: "playlist name",
      playlistTracks: [],
      searchResults: [],
      playlistList: [],
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <PlaylistSearch onClick={this.getUserPlaylists} />
          <h4>or create new playlist by adding new tracks:</h4>
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResult
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              playlistList={this.state.playlistList}
              isPlaylist={this.state.isPlaylist}
              onChoose={this.getUserPlaylistTracks}
              clearSearch={this.clearSearch}
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
