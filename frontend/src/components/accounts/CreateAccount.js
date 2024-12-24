import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Accounts.css"; // Import the CSS file

function CreateAccount() {
  const [newAccount, setNewAccount] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event) => setName(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);

  const BASE_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (event) => {

    event.preventDefault(); // Prevent default form submission

    try {
      const inputs = { data: { username, name } };
      const response = await axios.post(`${BASE_URL}/accounts`, inputs);
      setNewAccount(response.data.data); // Save the newly created account

      alert("Account created successfully!");

      const accountId = response.data.data.id;
      navigate(`/accounts/${accountId}`);
    } catch (error) {
      console.error("There was a problem creating the new account.", error);
      alert("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="account-section">
      <h1 className="account-title">Create New Account</h1>
      <form className="account-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            className="form-input"
            onChange={handleNameChange}
            value={name}
            required
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            className="form-input"
            onChange={handleUsernameChange}
            value={username}
            required
          />
        </label>
        <button type="submit" className="add-account-button">Submit</button>
      </form>

      {newAccount && (
        <div className="list-card">
          <h2>Account Created:</h2>
          <p>
            <strong>Name:</strong> {newAccount.name}
          </p>
          <p>
            <strong>Username:</strong> {newAccount.username}
          </p>
        </div>
      )}
    </div>
  );
}

export default CreateAccount;