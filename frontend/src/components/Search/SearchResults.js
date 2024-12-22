import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchShowData } from "../../utils/fetchShowData";
import "./SearchResults.css";

function SearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const data = await fetchShowData(`search/shows?q=${searchQuery}`);
        setResults(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchResults();
    }
  }, [searchQuery]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="search-results">
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
      <h1>Search Results for "{searchQuery}"</h1>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul className="results-list">
          {results.map((result) => (
            <li key={result.show.id} className="result-card">
              <h2>{result.show.name}</h2>
              <p>{result.show.summary?.replace(/<[^>]*>/g, "") || "No summary available."}</p>
              <button
                className="details-button"
                onClick={() => navigate(`/shows/${result.show.id}`)}
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
