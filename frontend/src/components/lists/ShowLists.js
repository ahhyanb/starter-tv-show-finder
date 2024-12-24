import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Lists.css";

const BASE_URL = process.env.REACT_APP_API_URL;

function ShowList() {
  const { listId } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState(null); // List details
  const [shows, setShows] = useState([]); // Shows in the list
  const [error, setError] = useState(null);



  useEffect(() => {
    async function fetchListAndShows() {
      try {
        const response = await axios.get(`${BASE_URL}/lists/${listId}`);
        setList(response.data.data); // Set list details
        setShows(response.data.data.shows || []); // Set associated shows
      } catch (err) {
        console.error("Error fetching the list:", err);
        setError("Failed to fetch the list. Please try again.");
      }
    }
    fetchListAndShows();
  }, [listId]);

  const handleRemoveShow = async (showId) => {
    if (window.confirm("Are you sure you want to remove this show from the list?")) {
      try {
        await axios.delete(`${BASE_URL}/lists/${listId}/shows/${showId}`);
        setShows((prevShows) => prevShows.filter((show) => show.id !== showId)); // Remove from local state
        alert("Show removed successfully.");
      } catch (err) {
        console.error("Error removing the show:", err);
        alert("Failed to remove the show. Please try again.");
      }
    }
  };

  if (error) return <p className="error-message">{error}</p>;
  if (!list) return <p className="loading-message">Loading...</p>;

  return (
    <div className="show-list-container">
      <h1 className="list-title">{list.title}</h1>
      <button
        onClick={() => navigate(`/lists/${listId}/edit`)}
        className="button-primary"
      >
        Edit List
      </button>

      <h2 className="list-subtitle">Shows in this list:</h2>
      {shows.length > 0 ? (
        <ul className="show-list">
          {shows.map((show) => (
            <li key={show.id} className="show-item">
              <h3>{show.name}</h3>
              <p>
                <strong>Genre:</strong> {show.genre}
              </p>
              <p>
                <strong>Summary:</strong> {show.summary}
              </p>
              <div className="button-container">
                <Link to={`/shows/${show.id}`}>
                  <button className="button-secondary">View Details</button>
                </Link>
                <button
                  onClick={() => handleRemoveShow(show.id)}
                  className="button-danger"
                >
                  Remove Show
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-shows-message">No shows in this list yet.</p>
      )}
    </div>
  );
}

export default ShowList;
