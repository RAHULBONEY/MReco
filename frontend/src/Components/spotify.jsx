import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "7e1d3c1eb7a44aac85896d68d2a6af2a";
const redirectUri = "http://localhost:4000/callback";
const scopes = [
  "streaming", // Required for Spotify Web Playback SDK
  // To read the current playback state
  // To modify the playback (play, pause, etc.)
  // To read the currently playing track
];

export const loginEndpoint = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${encodeURIComponent(
  scopes.join("%20")
)}&response_type=code&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https:/api.spotify/v1",
});
