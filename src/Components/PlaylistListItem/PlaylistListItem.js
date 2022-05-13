import React from 'react';

class PlaylistListItem extends React.Component {
    constructor(props){
        super(props);
        this.choosePlaylist = this.choosePlaylist.bind(this);
    }

    choosePlaylist() {
        //console.log(this.props.playlist.playlistId)
        this.props.onChoose(this.props.playlist.playlistId, this.props.playlist.name)
    }

    render() { 
        return (
            <div className='playlistListItem'>
                <div className='playlist-information'>
                    <button onClick={this.choosePlaylist}>
                        {this.props.playlist.name}
                    </button>
                </div>
            </div>
        );
    }
}
 
export default PlaylistListItem;