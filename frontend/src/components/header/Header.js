import React from "react";
import "./Header.css";
import SearchBar from "../search/SearchBar";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      {/* First Row: Logo */}
      <div className="logo-container">
        <Link to="/"> {/* Wrap logo in Link */}
          <img src="/logo3.png" alt="Logo" className="logo" />
        </Link>
      </div>

      {/* Second Row: Navigation Links and Search Bar */}
      <div className="header-bottom">
        {/* Navigation Links */}
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/accounts" className="link">Accounts</Link>
            </li>
            <li className="nav-item">
              <Link to="/lists" className="link">Lists</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="link">About</Link>
            </li>
          </ul>
        </nav>

        {/* Search Bar */}
        <div className="search-container">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}

export default Header;
