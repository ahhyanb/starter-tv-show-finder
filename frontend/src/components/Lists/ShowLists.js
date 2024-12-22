import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ShowsList.css";

function ShowList() {
  const { listId } = useParams(); // Extract listId from the URL
  const navigate = useNavigate(); // For navigation after deletion
  const [list, setList] = useState(null);
  const [shows, setShows] = useState([]); // State for associated shows
  const [error, setError] = useState(null);
  const [isDeletingList, setIsDeletingList] = useState(false);
  const [deletingShowId, setDeletingShowId] = useState(null);

  useEffect(() => {
    async function fetchListAndShows() {
      try {
        const response = await axios.get(`http://localhost:5001/lists/${listId}`);
        setList(response.data.data); // Set list details
        setShows(response.data.data.shows); // Set associated shows
      } catch (err) {
        console.error("Error fetching the list:", err);
        setError("Failed to fetch the list. Please try again.");
      }
    }
    fetchListAndShows();
  }, [listId]);

  const handleDeleteList = async () => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      setIsDeletingList(true);
      try {
        await axios.delete(`http://localhost:5001/lists/${listId}`);
        alert("List deleted successfully.");
        navigate("/lists"); // Redirect to all lists after deletion
      } catch (err) {
        console.error("Error deleting the list:", err);
        alert("Failed to delete the list. Please try again.");
      } finally {
        setIsDeletingList(false);
      }
    }
  };

  const handleDeleteShow = async (showId) => {
    if (window.confirm("Are you sure you want to remove this show from the list?")) {
      setDeletingShowId(showId);
      try {
        await axios.delete(`http://localhost:5001/lists/${listId}/shows/${showId}`);
        setShows((prevShows) => prevShows.filter((show) => show.id !== showId)); // Remove show from local state
        alert("Show removed from the list.");
      } catch (err) {
        console.error("Error removing the show:", err);
        alert("Failed to remove the show. Please try again.");
      } finally {
        setDeletingShowId(null);
      }
    }
  };

  if (error) return <p>{error}</p>; // Show error if fetch fails
  if (!list) return <p>Loading...</p>; // Show loading until data is fetched

  return (
    <div>
      <h1>{list.title}</h1> {/* List Title */}
      <p>List ID: {list.id}</p>

      <div className="action-buttons">
        <button onClick={handleDeleteList} disabled={isDeletingList}>
          {isDeletingList ? "Deleting List..." : "Delete List"}
        </button>
      </div>

      <h2>Shows in this list:</h2>
      {shows.length > 0 ? (
        <ul>
          {shows.map((show) => (
            <li key={show.id} className="show-card">
              <h3>{show.name}</h3>
              <p>
                <strong>Genre:</strong> {show.genre}
              </p>
              <p>
                <strong>Summary:</strong> {show.summary}
              </p>
              <button
                onClick={() => handleDeleteShow(show.id)}
                disabled={deletingShowId === show.id}
                style={{ backgroundColor: deletingShowId === show.id ? "grey" : "#e74c3c" }}
              >
                {deletingShowId === show.id ? "Removing..." : "Remove Show"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No shows in this list yet.</p>
      )}

      <Link to="/lists">
        <button>Back to All Lists</button>
      </Link>
    </div>
  );
}

export default ShowList;
