import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Lists.css"

function EditList() {
  const { listId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState(""); // Editable title
  const [shows, setShows] = useState([]); // Shows in the list
  const [newShowName, setNewShowName] = useState(""); // New show name input
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchListAndShows() {
      try {
        const response = await axios.get(`http://localhost:5001/lists/${listId}`);
        setTitle(response.data.data.title); // Pre-fill title
        setShows(response.data.data.shows || []); // Set associated shows
      } catch (err) {
        console.error("Error fetching the list:", err);
        alert("Failed to fetch the list. Please try again.");
      }
    }
    fetchListAndShows();
  }, [listId]);

  const handleRemoveShow = async (showId) => {
    if (window.confirm("Are you sure you want to remove this show?")) {
      try {
        await axios.delete(`http://localhost:5001/lists/${listId}/shows/${showId}`);
        setShows((prevShows) => prevShows.filter((show) => show.id !== showId));
      } catch (err) {
        console.error("Error removing the show:", err);
        alert("Failed to remove the show. Please try again.");
      }
    }
  };


  return (
    <div>
      <h1>Edit List</h1>

      <label>
        List Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
     
      <h2>Manage Shows</h2>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>
            <h3>{show.name}</h3>
            <button onClick={() => handleRemoveShow(show.id)}>Remove Show</button>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate(`/lists/${listId}`)}>Back to List Details</button>
    </div>
  );
}

export default EditList;
