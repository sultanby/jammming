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
        }

        if (!parsedToken) {
            window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
        }
    }
}

export default Spotify;