import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateList() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace this with the actual account_id you want to use
      const accountId = 15; // Hardcoded for now; you can make it dynamic later
  
      await axios.post("http://localhost:5001/lists", {
        data: { title, account_id: accountId }, // Include account_id
      });
  
      navigate("/lists"); // Redirect after successful creation
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };
  

  return (
    <div>
      <h1>Create a New List</h1>
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
        <button type="submit">Create List</button>
      </form>
    </div>
  );
}

export default CreateList;
