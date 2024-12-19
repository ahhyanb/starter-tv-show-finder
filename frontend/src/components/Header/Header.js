import React, { useState } from "react";
import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";

function Header() {
  const [searchResults, setSearchResults] = useState([]); // State for results
  const [hasSearched, setHasSearched] = useState(false);  // State to track if a search was made

  // Update results and mark that a search has been performed
  const handleSearchResults = (results) => {
    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="logo-container">
            <img src="/logo2.png" alt="TV Show Finder Logo" className="logo" />
          </div>
          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item"><a href="/" className="link">Home</a></li>
              <li className="nav-item"><a href="/shows" className="link">Shows</a></li>
              <li className="nav-item"><a href="/about" className="link">About</a></li>
            </ul>
          </nav>

          {/* SearchBar Component */}
          <SearchBar onSearchResults={handleSearchResults} />
        </div>
      </header>

      <main>
        <div className="search-results">
          {hasSearched ? (
            searchResults.length > 0 ? (
              <ul>
                {searchResults.map((result) => (
                  <li key={result.show.id}>
                    <strong>{result.show.name}</strong>
                    <p>
                      {result.show.summary
                        ? result.show.summary.replace(/<[^>]*>/g, "")
                        : "No summary available."}
                    </p>
                    <button>
                      <a href={`/shows/${result.show.id}`}>View Details</a>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No results found.</p>
            )
          ) : null} {/* Don't show anything until a search is made */}
        </div>
      </main>
    </>
  );
}

export default Header;
