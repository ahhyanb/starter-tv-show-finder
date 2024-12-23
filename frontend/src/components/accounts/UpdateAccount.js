import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateAccount() {
  const { accountId } = useParams(); // Get the accountId from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", username: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the current account details to pre-fill the form
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/accounts/${accountId}`);
        const account = response.data.data;
        setFormData({ name: account.name, username: account.username });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching account details:", error);
        alert("Failed to fetch account details. Please try again.");
        navigate("/accounts"); // Redirect to the accounts list if fetch fails
      }
    };

    fetchAccountDetails();
  }, [accountId, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:5001/accounts/${accountId}`, { data: formData });
      alert("Account updated successfully!");
      navigate(`/accounts/${accountId}`); // Redirect to the account details page
    } catch (error) {
      console.error("Error updating account:", error);
      alert("Failed to update account. Please try again.");
    }
  };

  if (isLoading) {
    return <p>Loading account details...</p>;
  }

  return (
    <div>
      <h1>Update Account</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Update Account</button>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </form>
    </div>
  );
}

export default UpdateAccount;
