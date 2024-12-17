import { React, useState } from "react";
import axios from "axios";

function SearchBar({ onSearchResults }) {

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchInput = (event) => {
        return setSearchQuery(event.target.value);
    }

    const fetchResults = async () => {
        try {
            const BASE_URL = "https://api.tvmaze.com/"
            const response = await axios.get(`${BASE_URL}search/shows?q=%${searchQuery}`);
            onSearchResults(response.data);
        } catch(errro) {
            console.error("Failed to fetch data", error)
        }
    };

    const handleEnterKey = (event) => {
        if (event.key === "Enter") {
            fetchResults();
        }
    }

    return ( 
        <div className="search-container">
        <input
          type="text"
          placeholder="Search for TV Shows..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="search-bar"
        />
        <button className="search-button" onClick={fetchResults}>
          Search
        </button>
      </div>
     );
}

export default SearchBar;