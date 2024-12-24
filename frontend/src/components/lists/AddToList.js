import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Lists.css";


function AddToList() {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { showId } = useParams(); // Get showId from route params
  const navigate = useNavigate();


  const BASE_URL = process.env.REACT_APP_API_URL;
  
  // Fetch all lists on component mount
  useEffect(() => {
    
    const fetchLists = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/lists`);
        setLists(response.data.data || []); // Set fetched lists
      } catch (err) {
        setError("Failed to fetch lists. Please try again.");
      }
    };

    fetchLists();
  }, []);

  // Handle adding the show to the selected list
  const handleAdd = async () => {
    if (!selectedList) {
      setError("Please select a list.");
      return;
    }

    if (!showId) {
      setError("Show ID is missing.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      const payload = { data: { showId } }; // Payload for the PUT request

      console.log(`Sending PUT request to /lists/${selectedList} with payload:`, payload);

      // Send the PUT request to add the show
      await axios.put(`${BASE_URL}/lists/${selectedList}/shows`, payload);

      setSuccess(true);

      // Navigate to the specific list page
      navigate(`/lists/${selectedList}`);
    } catch (err) {
      console.error("Error adding show to the list:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Failed to add show to the list.");
    } finally {
      setLoading(false);
    }
  };

  // Navigate back to the previous page
  const goBack = () => navigate(-1);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <button onClick={goBack} style={{ marginBottom: "20px" }}>
        Back
      </button>

      <h1>Add Show to List</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Show successfully added!</p>}

      <select
        value={selectedList}
        onChange={(e) => setSelectedList(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "1rem",
          marginBottom: "20px",
          width: "100%",
          maxWidth: "300px",
        }}
      >
        <option value="">-- Select a List --</option>
        {lists.map((list) => (
          <option key={list.id} value={list.id}>
            {list.title}
          </option>
        ))}
      </select>

      <div>
        <button
          onClick={handleAdd}
          disabled={loading}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          {loading ? "Adding..." : "Add to List"}
        </button>
      </div>
    </div>
  );
}

export default AddToList;
