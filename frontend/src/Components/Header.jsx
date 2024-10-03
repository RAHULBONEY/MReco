import React from "react";
import "../Styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src="/spotify.jpg" alt="mrec logo" className="logo-image" />
          <span className="site-name">MREC</span>
        </div>
        <nav className="nav-links">
          <a href="/about" className="nav-link">
            About
          </a>
          <a href="/privacy" className="nav-link">
            Privacy Policy
          </a>
        </nav>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
      </div>
    </header>
  );
};

export default Header;
