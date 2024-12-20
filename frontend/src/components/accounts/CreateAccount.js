import { useState } from "react";
import axios from "axios";

function CreateAccount() {
  const [newAccount, setNewAccount] = useState(null); // Changed to `null` initially
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const handleNameChange = (event) => setName(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const BASE_URL = "http://localhost:5001";

    try {
      const inputs = { data: { username, name } };
      const response = await axios.post(`${BASE_URL}/accounts`, inputs);
      setNewAccount(response.data.data); // Save the newly created account
      alert("Account created successfully!");
    } catch (error) {
      console.error("There was a problem creating the new account.", error);
      alert("Failed to create account. Please try again.");
    }
  };

  return (
    <>
      <h1>Create New Account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            onChange={handleNameChange}
            value={name}
            required
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            onChange={handleUsernameChange}
            value={username}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {newAccount && (
        <div>
          <h2>Account Created:</h2>
          <p>
            <strong>Name:</strong> {newAccount.name}
          </p>
          <p>
            <strong>Username:</strong> {newAccount.username}
          </p>
        </div>
      )}
    </>
  );
}

export default CreateAccount;
