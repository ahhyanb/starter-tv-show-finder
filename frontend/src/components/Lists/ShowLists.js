import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function ShowList() {
  const { listId } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState(null); // List details
  const [shows, setShows] = useState([]); // Shows in the list
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchListAndShows() {
      try {
        const response = await axios.get(`http://localhost:5001/lists/${listId}`);
        setList(response.data.data); // Set list details
        setShows(response.data.data.shows || []); // Set associated shows
      } catch (err) {
        console.error("Error fetching the list:", err);
        setError("Failed to fetch the list. Please try again.");
      }
    }
    fetchListAndShows();
  }, [listId]);

  if (error) return <p>{error}</p>;
  if (!list) return <p>Loading...</p>;

  return (
    <div>
      <h1>{list.title}</h1>
      <button onClick={() => navigate(`/lists/${listId}/edit`)}>Edit List</button> {/* Navigate to EditList */}

      <h2>Shows in this list:</h2>
      {shows.length > 0 ? (
        <ul>
          {shows.map((show) => (
            <li key={show.id}>
              <h3>{show.name}</h3>
              <p>
                <strong>Genre:</strong> {show.genre}
              </p>
              <p>
                <strong>Summary:</strong> {show.summary}
              </p>
              <Link to={`/shows/${show.id}`}> {/* Navigate to show details */}
                <button>View Show Details</button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No shows in this list yet.</p>
      )}
    </div>
  );
}

export default ShowList;
