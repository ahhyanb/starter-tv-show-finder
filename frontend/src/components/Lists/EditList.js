import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditList() {
  const { listId } = useParams();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchList() {
      try {
        const response = await axios.get(`http://localhost:5001/lists/${listId}`);
        setTitle(response.data.data.title);
      } catch (error) {
        console.error("Error fetching list:", error);
      }
    }
    fetchList();
  }, [listId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/lists/${listId}`, {
        data: { title },
      });
      navigate(`/lists/${listId}`);
    } catch (error) {
      console.error("Error updating list:", error);
    }
  };

  return (
    <div>
      <h1>Edit List</h1>
      <form onSubmit={handleSubmit}>
        <label>
          List Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <button type="submit">Update List</button>
      </form>
    </div>
  );
}

export default EditList;
