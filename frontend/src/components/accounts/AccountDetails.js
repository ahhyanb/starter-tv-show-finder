import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function AccountDetails() {
  const [accountDetails, setAccountDetails] = useState({});
  const [accountShows, setAccountShows] = useState([]);
  const [showDetails, setShowDetails] = useState({});
  const { accountId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const BASE_URL = "http://localhost:5001";

    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/accounts/${accountId}`);
        setAccountDetails(response.data.data);
        setAccountShows(response.data.data.shows || []);
      } catch (error) {
        console.error("There was a problem fetching the account details.", error);
      }
    };

    fetchAccountDetails();
  }, [accountId]);

  // Toggle function to show/hide details for a specific show
  const toggleShowDetails = (showId) => {
    setShowDetails((prev) => ({
      ...prev,
      [showId]: !prev[showId],
    }));
  };

  // Handle account deletion
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this account? This action is irreversible.")) {
      try {
        await axios.delete(`http://localhost:5001/accounts/${accountId}`);
        alert("Account deleted successfully.");
        navigate("/accounts"); // Redirect to accounts index after deletion
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete the account. Please try again.");
      }
    }
  };

  // Navigate to the edit account page
  const handleEdit = () => {
    navigate(`/accounts/${accountId}/edit`);
  };

  return (
    <div>
      <h1>{accountDetails.name || "Account Details"}</h1>
      <p>
        <strong>Username:</strong> {accountDetails.username}
      </p>
      <div className="action-buttons">
        <button onClick={handleEdit}>Edit Account</button>
        <button onClick={handleDelete}>Delete Account</button>
      </div>

      <h2>Shows</h2>
      {accountShows.length === 0 ? (
        <>
          <h3>There are no shows.</h3>
          <button onClick={() => navigate("/lists/new")}>Create New List</button>
        </>
      ) : (
        <ul>
          {accountShows.map((show) => (
            <li key={show.id}>
              <p>
                <strong>Name:</strong> {show.name}
              </p>
              <button onClick={() => toggleShowDetails(show.id)}>
                {showDetails[show.id] ? "Hide Details" : "See Details"}
              </button>
              {showDetails[show.id] && (
                <div>
                  <p>
                    <strong>Genre:</strong> {show.genre}
                  </p>
                  <p>
                    <strong>Summary:</strong> {show.summary}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AccountDetails;
