import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setError("Please enter a valid search term.");
      return;
    }

    setError(null);
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for TV Shows..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setError(null);
        }}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default SearchBar;
