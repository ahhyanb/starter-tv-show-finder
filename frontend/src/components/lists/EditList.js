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
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "white",
          marginBottom: "20px",
        }}
      >
        Edit List
      </h1>
  
      <p
        style={{
          textAlign: "center",
          color: "white",
          fontSize: "0.9rem",
          marginBottom: "20px",
        }}
      >
        Update the title of the list below.
      </p>
  
      {/* Editable title field */}
      <label style={{ display: "block", marginBottom: "15px", color: "white" }}>
        List Title:
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "1rem",
            boxSizing: "border-box",
            marginTop: "5px",
          }}
        />
      </label>
  
      {/* Manage shows */}
      <h2
        style={{
          textAlign: "center",
          color: "white",
          marginBottom: "15px",
        }}
      >
        Manage Shows
      </h2>
  
      <form>
        <p
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "0.9rem",
            marginBottom: "20px",
          }}
        >
          Select the TV shows you'd like to remove from the list. Click "Submit
          Changes" to save your updates.
        </p>
  
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {shows.map((show) => (
            <li
              key={show.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 15px",
                marginBottom: "10px",
                border: "3px solid #ddd",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              }}
            >
              <input
                type="checkbox"
                checked={selectedShows.includes(show.id)}
                onChange={() => handleCheckboxChange(show.id)}
                style={{
                  width: "18px",
                  height: "18px",
                  marginRight: "10px",
                }}
              />
              <label style={{ flexGrow: "1", fontSize: "1rem", color: "white" }}>
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
            display: "block",
            width: "100%",
            marginTop: "20px",
            padding: "12px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "background-color 0.3s",
          }}
        
        >
          Submit Changes
        </button>
      </form>
  
      {/* Back to List Details Button */}
      <button
        onClick={() => navigate(`/lists/${listId}`)}
        style={{
          display: "block",
          width: "100%",
          marginTop: "10px",
          padding: "12px",
          backgroundColor: "#6c757d",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "1rem",
          transition: "background-color 0.3s",
        }}
  
      >
        Back to List Details
      </button>
    </div>
  );
  
  
}

export default EditList;
