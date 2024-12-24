import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Lists.css"; // Assuming the CSS file is named styles.css

function ListSection() {
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLists() {
      try {
        const response = await axios.get("http://localhost:5001/lists");
        setLists(response.data.data);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    }
    fetchLists();
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
