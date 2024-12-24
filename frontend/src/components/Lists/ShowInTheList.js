import React from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Lists.css"

function ShowInTheList() {
  const { listId } = useParams(); // Extract list ID from the URL
  const location = useLocation();
  const navigate = useNavigate(); // For navigation after deletion
  const { show } = location.state || {}; // Extract show data from state

  const handleDeleteShow = async () => {
    if (!show || !show.id) {
      alert("Invalid show data. Cannot delete.");
      return;
    }

    if (window.confirm("Are you sure you want to remove this show from the list?")) {
      try {
        console.log(`Deleting showId=${show.id} from listId=${listId}`);
        await axios.delete(`http://localhost:5001/lists/${listId}/shows/${show.id}`);
        alert("Show removed successfully.");
        navigate(`/lists/${listId}`); // Navigate back to the list page
      } catch (error) {
        console.error("Error deleting the show:", error.response?.data || error.message);
        alert("Failed to delete the show. Please try again.");
      }
    }
  };

  if (!show) {
    return <p>Show details not available.</p>;
  }

  return (
    <div>
      <h1>{show.name}</h1>
      <p>
        <strong>Genre:</strong> {show.genre}
      </p>
      <p>
        <strong>Summary:</strong> {show.summary}
      </p>
      <div>
        <button
          onClick={handleDeleteShow}
          style={{ backgroundColor: "#e74c3c", color: "white", marginRight: "10px" }}
        >
          Delete Show
        </button>
        <Link to={`/lists/${listId}`}>
          <button>Back to List</button>
        </Link>
      </div>
    </div>
  );
}

export default ShowInTheList;
