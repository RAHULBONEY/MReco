import React, { useEffect, useState } from "react";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";
import "../Styles/SongReco.css";

const spotifyApi = new SpotifyWebApi({
  clientId: "7e1d3c1eb7a44aac85896d68d2a6af2a",
});

const SongReco = () => {
  const [accessToken, setAccessToken] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSong, setCurrentSong] = useState(null);
  const [audio, setAudio] = useState(new Audio());

  const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accesstoken");
    return { accessToken };
  };

  useEffect(() => {
    const { accessToken } = getQueryParams();
    if (accessToken) {
      setAccessToken(accessToken);
      spotifyApi.setAccessToken(accessToken);
    }
  }, []);

  const searchArtistByName = async (artistName) => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          artistName
        )}&type=artist`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error fetching artist:", response.status, errorMessage);
        return null;
      }

      const data = await response.json();
      if (data.artists.items.length > 0) {
        return data.artists.items[0].id;
      } else {
        console.log("Artist not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching artist:", error);
      return null;
    }
  };

  const getGenreSongs = async () => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/browse/categories/${genres[0]}/playlists?limit=5`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(
          "Error fetching genre songs:",
          response.status,
          errorMessage
        );
        return;
      }

      const data = await response.json();
      if (data.playlists.items) {
        setRecommendations((prev) => [
          ...prev,
          ...data.playlists.items.map((item) => item.tracks.items[0]),
        ]);
      } else {
        console.error("No tracks found for genre:", data);
      }
    } catch (error) {
      console.error("Error fetching genre songs:", error);
    }
  };

  const getArtistTopTracks = async (artistId) => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(
          "Error fetching artist's top tracks:",
          response.status,
          errorMessage
        );
        return;
      }

      const data = await response.json();
      if (data.tracks) {
        setRecommendations((prev) => [...prev, ...data.tracks.slice(0, 5)]);
      } else {
        console.error("No top tracks found for artist:", data);
      }
    } catch (error) {
      console.error("Error fetching artist's top tracks:", error);
    }
  };

  const fetchPreferencesAndRecommendations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:4000/user/fetchprefandartists"
      );
      if (!response.data) return;

      const { artists, pref } = response.data;

      setGenres(pref);
      setArtists(artists);

      if (artists.length > 0) {
        const artistId = await searchArtistByName(artists[0]);
        if (artistId) {
          await getArtistTopTracks(artistId);
        }
      }

      if (genres.length > 0) {
        await getGenreSongs();
      }
    } catch (error) {
      console.error("Could not fetch preferences and artists", error);
    } finally {
      setLoading(false);
    }
  };

  const playSong = (song) => {
    if (audio.src !== song.preview_url) {
      audio.src = song.preview_url;
      audio.play();
      setCurrentSong(song);
    } else {
      audio.paused ? audio.play() : audio.pause();
    }
  };

  useEffect(() => {
    fetchPreferencesAndRecommendations();
  }, [accessToken]);

  useEffect(() => {
    if (artists.length > 0) {
      const fetchRecommendations = async () => {
        const artistId = await searchArtistByName(artists[0]);
        if (artistId) {
          await getArtistTopTracks(artistId);
        }
      };
      fetchRecommendations();
    }
  }, [artists]);

  useEffect(() => {
    if (genres.length > 0) {
      getGenreSongs();
    }
  }, [genres]);

  return (
    <div className="recommendation-container">
      <h2>Recommendations</h2>
      {loading ? (
        <p>Loading recommendations...</p>
      ) : (
        <div className="cards-container">
          {recommendations.map((track) => (
            <div key={track.id} className="song-card">
              <img
                src={track.album.images[0].url}
                alt={track.name}
                className="album-image"
              />
              <h3>{track.name}</h3>
              <p className="artist-name">
                {track.artists.map((artist) => artist.name).join(", ")}
              </p>

              {track.preview_url ? (
                <div className="audio-player">
                  <audio controls>
                    <source src={track.preview_url} />
                    Your browser does not support the audio element.
                  </audio>
                  <button onClick={() => playSong(track)}>
                    {currentSong && currentSong.id === track.id && !audio.paused
                      ? "Pause"
                      : "Play"}
                  </button>
                </div>
              ) : (
                <a
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Listen on Spotify
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SongReco;
