import React from 'react';
import './PlaylistListItem.css'

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
                    <h3 onClick={this.choosePlaylist}>
                        {this.props.playlist.name}
                    </h3>
                </div>
            </div>
        );
    }
}
 
export default PlaylistListItem;