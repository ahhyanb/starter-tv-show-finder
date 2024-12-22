import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ListSection.css";

function ListSection() {
  const [lists, setLists] = useState([]);

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
  </div>
  
  );
}

export default ListSection;
