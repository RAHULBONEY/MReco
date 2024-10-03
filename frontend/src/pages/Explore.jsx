import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Explore.css";
import { FaSearch } from "react-icons/fa";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleIconClick = () => {
    if (searchTerm.trim()) {
      navigate(`/home/explore/songs?query=${searchTerm}`);
    }
  };
  return (
    <div className="music-search-container">
      <div className="search-section">
        <h1 className="search-title">Search for your favorite songs</h1>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Enter song or artist name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={handleIconClick} className="search-button">
            <FaSearch className="search-icon" />
          </button>
        </div>
      </div>

      <div className="content-section">
        <p className="description">
          Discover curated playlists and genres handpicked just for you. Explore
          a variety of music and find your next favorite song!
        </p>
      </div>

      <div className="album-scroller">
        <div className="scroller-inner">
          <img
            src="../album_pics/dal.jpg"
            alt="Dal Album 1"
            className="album-cover"
          />
          <img
            src="../album_pics/dal2.jpg"
            alt="Dal Album 2"
            className="album-cover"
          />
          <img
            src="../album_pics/jal.jpg"
            alt="Jal Album 1"
            className="album-cover"
          />
          <img
            src="../album_pics/jal2.jpg"
            alt="Jal Album 2"
            className="album-cover"
          />
          <img
            src="../album_pics/kal.jpg"
            alt="Kal Album 1"
            className="album-cover"
          />
          <img
            src="../album_pics/kal2.jpg"
            alt="Kal Album 2"
            className="album-cover"
          />
          <img
            src="../album_pics/lal.jpg"
            alt="Lal Album 1"
            className="album-cover"
          />
          <img
            src="../album_pics/lal2.jpg"
            alt="Lal Album 2"
            className="album-cover"
          />
          <img
            src="../album_pics/mral.jpg"
            alt="Mral Album 1"
            className="album-cover"
          />
          <img
            src="../album_pics/mral2.jpg"
            alt="Mral Album 2"
            className="album-cover"
          />
          <img
            src="../album_pics/rdal2.jpg"
            alt="Rdal Album 2"
            className="album-cover"
          />
          <img
            src="../album_pics/rdal.jpg"
            alt="Rdal Album 1"
            className="album-cover"
          />
          <img
            src="../album_pics/eal.jpg"
            alt="Eal Album"
            className="album-cover"
          />
          <img
            src="../album_pics/smal.jpg"
            alt="Smal Album"
            className="album-cover"
          />
          <img
            src="../album_pics/nal22.jpg"
            alt="Nal Album 2"
            className="album-cover"
          />
          <img
            src="../album_pics/krsnaal.jpg"
            alt="Krsna Album 1"
            className="album-cover"
          />
          <img
            src="../album_pics/krsna2.jpg"
            alt="Krsna Album 2"
            className="album-cover"
          />
          <img
            src="../album_pics/nal2.jpg"
            alt="Nal Album 2"
            className="album-cover"
          />
          <img
            src="../album_pics/nal.jpg"
            alt="Nal Album 1"
            className="album-cover"
          />
          <img
            src="../album_pics/kwal2.jpg"
            alt="Kwal Album 2"
            className="album-cover"
          />
          <img
            src="../album_pics/kwal.jpg"
            alt="Kwal Album 1"
            className="album-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Explore;
