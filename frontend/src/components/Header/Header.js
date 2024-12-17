// Modernized Header Component
import React from "react";
import "./Header.css"; // Ensure to update this CSS file with the new styles

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo-container">
          <img src="/logo2.png" alt="TV Show Finder Logo" className="logo" />
          {/* <h1 className="title">TV Show Finder</h1> */}
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="/" className="link">Home</a>
            </li>
            <li className="nav-item">
              <a href="/shows" className="link">Shows</a>
            </li>
            <li className="nav-item">
              <a href="/about" className="link">About</a>
            </li>
          </ul>
        </nav>
        <div className="search-container">
          <input type="text" placeholder="Search for TV Shows..." className="search-bar" />
          <button className="search-button">Search</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
