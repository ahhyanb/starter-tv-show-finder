import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Lists.css"

function CreateList() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [listName, setListName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Mark as submitting
    
    const BASE_URL = process.env.REACT_APP_API_URL;
  
    try {
      let accountId;
  
      // Step 1: Check if the account exists
      const accountsResponse = await axios.get(`${BASE_URL}/accounts`);
      const accounts = accountsResponse.data.data; // Access the nested data array
  
      console.log("Accounts fetched:", accounts); // Debugging log
  
      const existingAccount = accounts.find(
        (account) => account.username === username
      );
  
      if (existingAccount) {
        // If the account exists, use its ID
        accountId = existingAccount.id;
      } else {
        // Otherwise, create a new account
        const accountResponse = await axios.post(`${BASE_URL}/accounts`, {
          data: {
            username,
            name,
          },
        });
        accountId = accountResponse.data.data.id; // Access nested ID
      }
  
      // Step 2: Create the new list
      const newList = {
        account_id: accountId, // Foreign key
        title: listName,        // Watchlist name
      };
  
      console.log("Creating new list with data:", {
        data: newList, // Log payload
      });
  
      const listResponse = await axios.post(`${BASE_URL}/lists`, {
        data: newList, // Payload matches backend schema
      });
  
      console.log("List created successfully:", listResponse.data);
      alert("List created successfully!");

      navigate(`/lists/${listResponse.data.data.id}`);

    } catch (error) {
      console.error("Error creating list:", error.response?.data || error.message);
      alert("Failed to create the list. Please try again.");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }

  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create a New Watchlist</h1>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Name: (Only required if you're new)
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        List Name:
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          required
        />
      </label>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Watchlist"}
      </button>
    </form>
  );
}

export default CreateList;
