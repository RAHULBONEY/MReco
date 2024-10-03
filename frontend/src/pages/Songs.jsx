import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../Styles/Songs.css";

const Songs = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for spinner
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query");

  const getTracks = async () => {
    setLoading(true); // Show spinner while loading
    try {
      let data = await fetch(
        `https://v1.nocodeapi.com/rahulboney/spotify/nxHHKNxUdTrGgcEC/search?q=${searchTerm}&type=track`
      );
      let convertedData = await data.json();
      setTracks(convertedData.tracks.items);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    } finally {
      setLoading(false); // Hide spinner once data is fetched
    }
  };

  return (
    <div className="songs-container">
      <h1 className="search-term">{searchTerm}</h1>
      <button onClick={getTracks} className="search-button">
        Check
      </button>

      {/* Show the spinner when loading */}
      {loading ? (
        <div className="spinner">
          <div className="spinner-circle"></div>
        </div>
      ) : (
        <div className="tracks-grid">
          {tracks.map((element) => (
            <div className="song-card" key={element.id}>
              <img
                src={element.album.images[0].url}
                alt={element.name}
                className="song-image"
              />
              <div className="song-info">
                <h3 className="song-title">{element.name}</h3>
                <p className="song-artist">{element.artists[0].name}</p>
              </div>
              {element.preview_url && (
                <audio className="song-audio" controls>
                  <source src={element.preview_url} type="audio/mpeg" />
                </audio>
              )}
              <a
                href={element.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="listen-on-spotify"
              >
                Listen on Spotify
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Songs;
