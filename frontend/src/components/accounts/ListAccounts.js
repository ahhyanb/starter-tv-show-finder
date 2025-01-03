import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Accounts.css"; // Import the shared CSS file

const BASE_URL = process.env.REACT_APP_API_URL;

function ListAccounts() {
  const [accounts, setAccounts] = useState([]); // Initialize as an empty array
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController instance

    const fetchList = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/accounts`, {
          signal: controller.signal, // Attach the signal to the Axios request
        });
        setAccounts(response.data.data); // Assuming API returns { data: { data: [...] } }
        console.log("Fetched accounts:", response.data.data);
      } catch (error) {
        if (error.name === "CanceledError") {
          console.log("Fetch canceled:", error.message);
        } else {
          console.error("There was a problem fetching the accounts:", error);
        }
      }
    };

    fetchList();

    // Cleanup function to abort the fetch if the component unmounts
    return () => {
      controller.abort();
    };
  }, []); // Dependency array ensures it runs once when component mounts

  return (
    <div className="account-section">
      <h1 className="account-title">Accounts List</h1>

      {/* Add New Account Button */}
      <button
        className="add-account-button"
        onClick={() => navigate("/accounts/new")}
        style={{ marginBottom: "20px" }}
      >
        Add New Account
      </button>

      <div className="account-lists">
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <div className="list-card" key={account.id}>
              <h3>{account.name}</h3>
              <p>{account.username}</p>
              <button
                className="list-card-button"
                onClick={() => navigate(`/accounts/${account.id}`)}
              >
                View List
              </button>
            </div>
          ))
        ) : (
          <p>Loading accounts...</p> // Show a message while data is being fetched
        )}
      </div>
    </div>
  );
}

export default ListAccounts;
