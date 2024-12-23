import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function AccountDetails() {
  const [accountDetails, setAccountDetails] = useState({});
  const [accountLists, setAccountLists] = useState([]);
  const { accountId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const BASE_URL = "http://localhost:5001";

    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/accounts/${accountId}`);
        setAccountDetails(response.data.data); // Set the account details
        setAccountLists(response.data.data.lists || []); // Set the associated lists
      } catch (error) {
        console.error("There was a problem fetching the account details.", error);
      }
    };

    fetchAccountDetails();
  }, [accountId]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this account? This action is irreversible.")) {
      try {
        await axios.delete(`http://localhost:5001/accounts/${accountId}`);
        alert("Account deleted successfully.");
        navigate("/accounts");
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete the account. Please try again.");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/accounts/${accountId}/edit`);
  };

  const handleCreateNewList = () => {
    navigate(`/lists/new?accountId=${accountId}&username=${accountDetails.username}`);
  };
  

  return (
    <div>
      <h1>{accountDetails.name || "Account Details"}</h1>
      <p>
        <strong>Username:</strong> {accountDetails.username}
      </p>
      <div className="action-buttons">
        <button onClick={handleEdit}>Edit Account</button>
        <button onClick={handleDelete}>Delete Account</button>
      </div>

      <h2>Lists</h2>
      {accountLists.length === 0 ? (
        <>
          <h3>This account has no lists.</h3>
          <button onClick={handleCreateNewList}>Create New List</button>
        </>
      ) : (
        <ul>
          {accountLists.map((list) => (
            <li key={list.id}>
              <h3>{list.title}</h3>
              <button onClick={() => navigate(`/lists/${list.id}`)}>View List</button>
            </li>
          ))}
        </ul>
      )}
      {/* Always show the "Create New List" button */}
      <button onClick={handleCreateNewList} style={{ marginTop: "20px" }}>
        Create New List
      </button>
    </div>
  );
}

export default AccountDetails;
