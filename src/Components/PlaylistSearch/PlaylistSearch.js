import React from 'react';

class PlaylistSearch extends React.Component {
    state = {  } 
    render() { 
        return (
            <div>
                <button onClick={this.props.onClick}>GET MY PLAYLISTS</button>
            </div>
        );
    }
}
 
export default PlaylistSearch;