import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Lists.css"; // Assuming the CSS file is named styles.css

const BASE_URL = process.env.REACT_APP_API_URL;

function ListSection() {
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController instance

    async function fetchLists() {
      try {
        const response = await axios.get(`${BASE_URL}/lists`, {
          signal: controller.signal, // Attach the signal to Axios request
        });
        setLists(response.data.data);
        console.log("Fetched lists:", response.data.data);
      } catch (error) {
        if (error.name === "CanceledError") {
          console.log("Fetch aborted:", error.message); // Handle fetch abortion
        } else {
          console.error("Error fetching lists:", error);
        }
      }
    }

    fetchLists();

    // Cleanup function to abort the fetch request on component unmount
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <h1 className="list-title">All TV Show Lists</h1>
      <ul className="list-section">
        {lists.map((list) => (
          <li key={list.id} className="card">
            <h3>{list.title}</h3>
            <Link to={`/lists/${list.id}`}>
              <button className="button-primary">View List</button>
            </Link>
          </li>
        ))}
      </ul>

      <div className="button-container">
        <button
          className="add-new-list-button"
          onClick={() => navigate("/lists/new")}
        >
          Add New List
        </button>
        <button
          className="compare-button"
          onClick={() => navigate("/lists/compare")}
        >
          Compare Lists
        </button>
      </div>
    </div>
  );
}

export default ListSection;
