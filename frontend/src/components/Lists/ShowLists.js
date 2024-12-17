import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ShowsList.css"

function ShowList() {
  const { listId } = useParams(); // Extract listId from the URL
  const [list, setList] = useState(null);
  const [shows, setShows] = useState([]); // State for associated shows
  const [error, setError] = useState(null);

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

  if (error) return <p>{error}</p>; // Show error if fetch fails
  if (!list) return <p>Loading...</p>; // Show loading until data is fetched

  return (
    <div>
      <h1>{list.title}</h1> {/* List Title */}
      <p>List ID: {list.id}</p>

      <h2>Shows in this list:</h2>
      {shows.length > 0 ? (
        <ul>
          {shows.map((show) => (
            <li key={show.id} className="show-card">
              <h3>{show.name}</h3>
              <p><strong>Genre:</strong> {show.genre}</p>
              <p><strong>Summary:</strong> {show.summary}</p>
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
