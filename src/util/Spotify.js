const CLIENT_ID='cbddd3acba224a4ab545becd79fce2b0';
const REDIRECT_URI='http://localhost:3000/'

let accessToken;


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

    search(term) {
        accessToken = Spotify.getAccessToken();
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
        let accessToken = this.getAccessToken();
        let headers = {Authorization: `Bearer ${accessToken}`};
        let userID;
        let playlistID;

        let idFetch = await fetch('https://api.spotify.com/v1/me', {
                            headers: headers
                        });
        let response = await idFetch.json();
        userID = response.id;

        let playlistIdFetch = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                                    headers: headers,
                                    method: 'POST',
                                    body: JSON.stringify({name: playlistName})
                                })
        response = await playlistIdFetch.json();
        playlistID = response.id;

        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({uris: trackURIs})
            })
    }
}

export default Spotify;