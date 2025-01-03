import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


function ShowDetails() {
  const { showId } = useParams();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const BASE_URL = "https://api.tvmaze.com/";
        const response = await axios.get(`${BASE_URL}shows/${showId}`);
        setShowDetails(response.data);
      } catch (error) {
        setError("Failed to fetch show details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [showId]);

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleAddToList = () => navigate(`/lists/${showId}/new`);


  if (loading) return <p>Loading show details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="show-details">
      <button onClick={handleBack} className="close-button">
        Back
      </button>
      <h1>{showDetails.name}</h1>

      {/* Show Image */}
      {showDetails.image?.medium && (
        <img src={showDetails.image.medium} alt={showDetails.name} />
      )}

      {/* Summary */}
      <p>{showDetails.summary?.replace(/<[^>]*>/g, "") || "No summary available."}</p>

      {/* Additional Details */}
      <ul>
        <li>
          <strong>Genres:</strong> {showDetails.genres.join(", ")}
        </li>
        <li>
          <strong>Rating:</strong> {showDetails.rating?.average || "N/A"}
        </li>
        <li>
          <strong>Language:</strong> {showDetails.language}
        </li>
        <li>
          <strong>Status:</strong> {showDetails.status}
        </li>
        <li>
          <strong>Runtime:</strong> {showDetails.runtime} minutes
        </li>
        <li>
          <strong>Premiered:</strong> {showDetails.premiered}
        </li>
        {showDetails.officialSite && (
          <li>
            <strong>Official Site:</strong>
            <a href={showDetails.officialSite} target="_blank" rel="noreferrer">
              Visit Here
            </a>
          </li>
        )}
      </ul>

      <button onClick={handleAddToList} className="add-to-list-button">
        Add to List
      </button>
    </div>
  );
}

export default ShowDetails;
