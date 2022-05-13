import React from 'react';
import './SearchResult.css';
import TrackList from '../TrackList/TrackList';
import PlaylistList from '../PlaylistList/PlaylistList';

class SearchResult extends React.Component {
    render() { 
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                {this.props.isPlaylist ? 
                    <PlaylistList
                        playlists={this.props.playlistList}
                        onChoose={this.props.onChoose}
                    />
                    : 
                    <TrackList 
                        tracks={this.props.searchResults}
                        onAdd={this.props.onAdd}
                        isRemoval={false}
                    />
                }
            </div>
        );
    }
}
 
export default SearchResult;