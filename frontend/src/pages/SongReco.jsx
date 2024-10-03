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
  const [artists, setArtists] = useState([]); // Store user-provided artists
  const [genres, setGenres] = useState([]); // Store user-provided genres
  const [loading, setLoading] = useState(true); // Loading state

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

  // Function to search for artist ID by name
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

      // Check response status
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error fetching artist:", response.status, errorMessage);
        return null;
      }

      const data = await response.json();
      if (data.artists.items.length > 0) {
        return data.artists.items[0].id; // Get the first matching artist ID
      } else {
        console.log("Artist not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching artist:", error);
      return null;
    }
  };

  // Function to fetch recommendations based on artists and genres
  const getRecommendations = async (artistId) => {
    try {
      // Create a comma-separated string for seed genres and artists
      const seedGenresString = genres.join(",") || ""; // Joining the genres array
      const seedArtistsString = artistId ? artistId : ""; // Using artistId if available

      const response = await fetch(
        `https://api.spotify.com/v1/recommendations?seed_genres=${seedGenresString}&min_popularity=50&limit=10&seed_artists=${seedArtistsString}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Check for response status
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(
          "Error fetching recommendations:",
          response.status,
          errorMessage
        );
        return;
      }

      const data = await response.json();
      if (data.tracks) {
        setRecommendations(data.tracks); // Update state with the recommended tracks
      } else {
        console.error("No tracks found in recommendations:", data);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  // Function to fetch user preferences and get recommendations
  const fetchPreferencesAndRecommendations = async () => {
    setLoading(true); // Set loading to true
    try {
      const response = await axios.get(
        "http://localhost:4000/user/fetchprefandartists" // Adjust this endpoint if necessary
      );
      if (!response.data) return;

      const { artists, pref } = response.data;

      // Set genres and artists
      setGenres(pref); // Set the genres from user preferences
      setArtists(artists); // Set the artists from user preferences

      // Fetch recommendations using the first artist
      if (artists.length > 0) {
        const artistId = await searchArtistByName(artists[0]);
        if (artistId) {
          await getRecommendations(artistId);
        }
      }
    } catch (error) {
      console.error("Could not fetch preferences and artists", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchPreferencesAndRecommendations(); // Fetch preferences on component mount
  }, [accessToken]); // Fetch again when accessToken changes

  useEffect(() => {
    if (artists.length > 0) {
      const fetchRecommendations = async () => {
        const artistId = await searchArtistByName(artists[0]);
        if (artistId) {
          await getRecommendations(artistId);
        }
      };
      fetchRecommendations();
    }
  }, [artists]); // Fetch recommendations when artists change

  return (
    <div className="recommendation-container">
      <h2>Recommendations</h2>
      {loading ? ( // Show loading state
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
                <audio controls className="audio-element">
                  <source src={track.preview_url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
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
