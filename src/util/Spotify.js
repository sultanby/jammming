const CLIENT_ID='cbddd3acba224a4ab545becd79fce2b0';
const REDIRECT_URI='http://localhost:3000/'
//const REDIRECT_URI='http://jammming-sultanby.surge.sh';

let accessToken;
let userID;


let Spotify = {
    getAccessToken(){
        if (accessToken) {
            return accessToken;
        }

        const urlToParse = window.location.href;
        let parsedToken = urlToParse.match(/access_token=([^&]*)/);
        let parsedExpirationTime = urlToParse.match(/expires_in=([^&]*)/);

        if (parsedToken && parsedExpirationTime) {
            accessToken = parsedToken[1];
            let expirationTime = parsedExpirationTime[1];
            window.setTimeout(() => accessToken = '', expirationTime * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
        }
    },

    async getCurrentUserId(){
        if (userID) {
            return userID;
        }
        if(!accessToken){
            this.getAccessToken();
        }
        let headers = {Authorization: `Bearer ${accessToken}`};
        let idFetch = await fetch('https://api.spotify.com/v1/me', {
                            headers: headers
                        });
        let response = await idFetch.json();
        userID = response.id;
        return userID;
    },

    async getUserPlaylists() {
        if (!userID) {
            await this.getCurrentUserId();
        }
        if(!accessToken){
            this.getAccessToken();
        }
        let headers = {Authorization: `Bearer ${accessToken}`};
        let playlistListFetch = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            headers: headers
        });
        let response = await playlistListFetch.json();
        let data = response.items.map(item => {
            return {
                name: item.name,
                playlistId: item.id
            }
        });
        console.log(data);
        return data;
    },

    async getPlaylist(playlistId){
        let headers = {Authorization: `Bearer ${accessToken}`};
        let playlistFetch = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`, {
            headers: headers
        });
        let response = await playlistFetch.json();
        let playlistTracksArray = response.items.map(items => {return items.track});
        let playlistTracks = playlistTracksArray.map(track => {
            return {
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }
        })
        //console.log(playlistTracks);
        return playlistTracks;
    },


    search(term) {
        accessToken = Spotify.getAccessToken();
        //this.getUserPlaylists();
        //this.getPlaylist("0GYF4VvEPcuHs9gEKzR59v");
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {Authorization:`Bearer ${accessToken}`}
        })  
        .then(response => {
            return response.json()
        })
        .then(responseToJSON => {
            if (!responseToJSON.tracks) {
                return [];
            } return responseToJSON.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
        });
    },

    
    async savePlaylist(playlistName, trackURIs) {
        if(!playlistName || !trackURIs) {
            return;
        }
        if(!accessToken){
            this.getAccessToken();
        }
        if(!userID){
            await this.getCurrentUserId();
        }
        let headers = {Authorization: `Bearer ${accessToken}`};
        let playlistID;

        let playlistIds = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                                    headers: headers,
                                    method: 'POST',
                                    body: JSON.stringify({name: playlistName})
                                })
        let response = await playlistIds.json();
        playlistID = response.id;

        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({uris: trackURIs})
            })
    },

    async updatePlaylistItems(trackURIs, playlistID, playlistName) {
        if(!trackURIs){
            return;
        }
        if(!accessToken){
            this.getAccessToken();
        }
        if(!userID){
            await this.getCurrentUserId();
        }
        let headers = {Authorization: `Bearer ${accessToken}`};

        await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}`, {
            headers: headers,
            method: 'PUT',
            body: JSON.stringify({name: playlistName})
        })

        return await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
            headers: headers,
            method: 'PUT',
            body: JSON.stringify({uris: trackURIs})
        })
    }
}

export default Spotify;