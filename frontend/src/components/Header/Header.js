// Modernized Header Component
import { React, useState } from "react";
import "./Header.css"; // Ensure to update this CSS file with the new styles
import axios from "axios";


function Header() {


  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  const handleInputChange = (event) => {
    return setSearchQuery(event.target.value);
  };

  const fetchResults = async () => {
      try {
        const BASE_URL = "https://api.tvmaze.com/"
        const response = await axios.get(`${BASE_URL}search/shows?q=${searchQuery}`);
        console.log(response.data);
        setSearchResults(response.data);
      } catch {
        console.error({ error: "Failed fetching data"});
      }
    };

     // Triggers search when Enter is pressed
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchResults();
    }
  };

  return (
    <>
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

        {/* Search Bar */}
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search for TV Shows..."
            value={searchQuery} 
            onChange= {handleInputChange}
            onKeyDown={handleKeyDown} // Handles Enter key
            className="search-bar" />
          <button 
            className="search-button"
            onClick={fetchResults}
          >
            Search</button>
        </div>
      </div>
    </header>
    
    <main>
        <div className="search-results">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((result) => (
                <li key={result.show.id}>
                  <strong>{result.show.name}</strong>
                  <p>{result.show.summary ? result.show.summary.replace(/<[^>]*>/g, "") : "No summary available."}</p>
                </li>
              ))}
            </ul>
          ) : (
            searchQuery && <p>No results found for "{searchQuery}".</p>
          )}
        </div>
      </main>

</>

  );
}

export default Header;
