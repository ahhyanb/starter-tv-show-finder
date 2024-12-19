import { useState, useEffect } from "react";
import axios from "axios";

function ListAccounts() {
  const [accounts, setAccounts] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const BASE_URL = "http://localhost:5001";

    const fetchList = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/accounts`);
        setAccounts(response.data.data); // Assuming API returns { data: { data: [...] } }
        console.log("Fetched accounts:", response.data.data);
      } catch (error) {
        console.error("There was a problem fetching the accounts:", error);
      }
    };

    fetchList();
  }, []); // Dependency array ensures it runs once when component mounts

  return (
    <>
      <h1>Accounts List</h1>
      <ul>
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <li key={account.id}>
              <h3>{account.name}</h3>
              <p>{account.username}</p>
              <button>View List</button>
            </li>
          ))
        ) : (
          <p>Loading accounts...</p> // Show a message while data is being fetched
        )}
      </ul>
    </>
  );
}

export default ListAccounts;
