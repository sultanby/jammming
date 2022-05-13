import React from 'react';
import "./PlaylistSearch.css";

class PlaylistSearch extends React.Component {
    render() { 
        return (
            <div className="PlaylistSearch">
                <button className="PlaylistSearchButton" onClick={this.props.onClick}>GET MY PLAYLISTS</button>
            </div>
        );
    }
}
 
export default PlaylistSearch;