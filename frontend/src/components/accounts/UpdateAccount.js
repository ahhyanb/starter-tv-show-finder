import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Accounts.css"; // Import shared CSS for consistency

const BASE_URL = process.env.REACT_APP_API_URL;

function UpdateAccount() {
  const { accountId } = useParams(); // Get the accountId from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", username: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController

    // Fetch the current account details to pre-fill the form
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/accounts/${accountId}`, {
          signal: controller.signal, // Attach the signal to Axios request
        });
        const account = response.data.data;
        setFormData({ name: account.name, username: account.username });
        setIsLoading(false);
      } catch (error) {
        if (error.name === "CanceledError") {
          console.log("Fetch aborted:", error.message); // Handle fetch abortion
        } else {
          console.error("Error fetching account details:", error);
          alert("Failed to fetch account details. Please try again.");
          navigate("/accounts"); // Redirect to the accounts list if fetch fails
        }
      }
    };

    fetchAccountDetails();

    return () => {
      controller.abort(); // Abort the fetch request on component unmount
    };
  }, [accountId, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`${BASE_URL}/accounts/${accountId}`, { data: formData });
      alert("Account updated successfully!");
      navigate(`/accounts/${accountId}`); // Redirect to the account details page
    } catch (error) {
      console.error("Error updating account:", error);
      alert("Failed to update account. Please try again.");
    }
  };

  if (isLoading) {
    return <p className="loading-text">Loading account details...</p>;
  }

  return (
    <div className="account-section">
      <h1 className="account-title">Update Account</h1>
      <form className="account-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <div className="form-buttons">
          <button type="submit" className="update-button">
            Update Account
          </button>
          <button type="button" className="cancel-button" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateAccount;
