import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Lists.css";

const BASE_URL = process.env.REACT_APP_API_URL;

function EditList() {
  const { listId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState(""); // Editable title
  const [shows, setShows] = useState([]); // Shows in the list
  const [selectedShows, setSelectedShows] = useState([]); // IDs of selected shows

  useEffect(() => {
    const controller = new AbortController();

    async function fetchListAndShows() {
      try {
        const response = await axios.get(`${BASE_URL}/lists/${listId}`, {
          signal: controller.signal,
        });
        setTitle(response.data.data.title);
        setShows(response.data.data.shows || []);
      } catch (err) {
        if (err.name === "CanceledError") {
          console.log("Fetch aborted:", err.message);
        } else {
          console.error("Error fetching the list:", err);
          alert("Failed to fetch the list. Please try again.");
        }
      }
    }

    fetchListAndShows();

    return () => {
      controller.abort();
    };
  }, [listId]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCheckboxChange = (showId) => {
    setSelectedShows((prevSelected) =>
      prevSelected.includes(showId)
        ? prevSelected.filter((id) => id !== showId)
        : [...prevSelected, showId]
    );
  };
  const handleSubmit = async () => {
    try {
      // Fetch the current list details
      const response = await axios.get(`${BASE_URL}/lists/${listId}`);
      const fullList = response.data.data;
  
      // Prepare the payload
      const { shows, ...updatedList } = {
        ...fullList,
        title, // Overwrite the title with the updated value
      };
  
      // Send the updated list data
      await axios.put(`${BASE_URL}/lists/${listId}`, { data: updatedList });
  
      // Remove selected shows
      for (const showId of selectedShows) {
        await axios.delete(`${BASE_URL}/lists/${listId}/shows/${showId}`);
      }
  
      alert("List updated successfully!");
      setSelectedShows([]); // Clear selected shows
      navigate(`/lists/${listId}`); // Redirect to list details
    } catch (err) {
      console.error("Error updating the list:", err);
      alert("Failed to update the list. Please try again.");
    }
  };
  
  return (
    <div>
      <h1>Edit List</h1>
  
      {/* Add user instructions */}
      <p>
        Update the title of the list below and select the TV shows you'd like to remove
        from the list. Click "Submit Changes" to save your updates.
      </p>
  
      {/* Editable title field */}
      <label>
        List Title:
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </label>
  
      {/* Manage shows */}
      <h2>Manage Shows</h2>
      <form>
        <ul>
          {shows.map((show) => (
            <li key={show.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedShows.includes(show.id)}
                  onChange={() => handleCheckboxChange(show.id)}
                />
                {show.name}
              </label>
            </li>
          ))}
        </ul>
  
        {/* Submit Changes Button */}
        <button
          type="button"
          onClick={handleSubmit}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit Changes
        </button>
      </form>
  
      {/* Back to List Details Button */}
      <button
        onClick={() => navigate(`/lists/${listId}`)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#6c757d",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Back to List Details
      </button>
    </div>
  );
  
}

export default EditList;
