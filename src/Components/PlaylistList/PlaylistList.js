import React from 'react';
import PlaylistListItem from '../PlaylistListItem/PlaylistListItem';

class PlaylistList extends React.Component { 
    render() { 
        return (
            <div className='playlistList'>
                {this.props.playlists.map(playlist => 
                    <PlaylistListItem 
                        key={playlist.playlistId} 
                        playlist={playlist}
                        onChoose={this.props.onChoose}
                    />
                    )
                }
            </div>
        );
    }
}
 
export default PlaylistList;