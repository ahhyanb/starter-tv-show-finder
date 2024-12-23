import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ListSection.css";

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
    <h1 className="list-title">All TV Show Lists</h1> {/* Styled Title */}
    <ul className="list-section">
      {lists.map((list) => (
        <li key={list.id} className="card">
          <h3>{list.title}</h3>
          {/* Add link to navigate to ShowList component */}
          <Link to={`/lists/${list.id}`}>
            <button>View List</button>
          </Link>
        </li>
      ))}
    </ul>

       {/* Compare Lists Button */}
       <button
        className="compare-button"
        onClick={() => navigate("/lists/compare")}
        style={{ marginTop: "20px" }}
      >
        Compare Lists
      </button>

  </div>
  
  );
}

export default ListSection;
