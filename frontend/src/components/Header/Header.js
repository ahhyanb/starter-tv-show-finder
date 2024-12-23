import React from "react";
import "./Header.css";
import SearchBar from "../search/SearchBar";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo-container">
          <Link to="/">
            <img src="/logo2.png" alt="TV Show Finder Logo" className="logo" />
          </Link>
        </div>

        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/lists " className="link">Lists</Link>
            </li>
            <li className="nav-item">
              <Link to="/accounts" className="link">Accounts</Link>
            </li>
          </ul>
        </nav>

        {/* SearchBar Component */}
        <SearchBar />
      </div>
    </header>
  );
}

export default Header;
