import { useState, useEffect } from "react";
import axios from "axios";

function CompareLists() {
  const [lists, setLists] = useState([]);
  const [selectedListIds, setSelectedListIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showComparison, setShowComparison] = useState(false); // Tracks if comparison should be displayed

  useEffect(() => {
    const fetchLists = async () => {
      const BASE_URL = "http://localhost:5001";
      try {
        const response = await axios.get(`${BASE_URL}/lists`);
        setLists(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching lists:", err);
        setError("Failed to load lists. Please try again.");
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  const handleCheckboxChange = (listId) => {
    setSelectedListIds((prev) => {
      if (prev.includes(listId)) {
        return prev.filter((id) => id !== listId); // Remove the list if already selected
      }
      return prev.length < 2 ? [...prev, listId] : prev; // Add if less than 2 are selected
    });
  };

  const handleProceed = () => {
    if (selectedListIds.length === 2) {
      setShowComparison(true);
    }
  };

  if (loading) return <p>Loading lists...</p>;
  if (error) return <p>{error}</p>;

  if (!showComparison) {
    return (
      <>
        <h1>Compare Lists</h1>
        <p>Select two lists to compare their common shows:</p>
        <ul>
          {lists.map((list) => (
            <li key={list.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedListIds.includes(list.id)}
                  onChange={() => handleCheckboxChange(list.id)}
                  disabled={
                    !selectedListIds.includes(list.id) && selectedListIds.length >= 2
                  } // Disable if already 2 are selected
                />
                {list.title}
              </label>
            </li>
          ))}
        </ul>
        <button
          onClick={handleProceed}
          disabled={selectedListIds.length !== 2}
        >
          Proceed to Comparison
        </button>
        {selectedListIds.length !== 2 && (
          <p>Please select exactly two lists to proceed.</p>
        )}
      </>
    );
  }

  // Find the two selected lists
  const [list1, list2] = selectedListIds.map((id) =>
    lists.find((list) => list.id === id)
  );

  // Find common shows between the two lists
  const commonShows = list1.shows.filter((show1) =>
    list2.shows.some((show2) => show1.id === show2.id)
  );

  return (
    <>
      <h1>Compare Lists</h1>
      <h2>Selected Lists</h2>
      <p>
        {list1.title} & {list2.title}
      </p>

      <h3>Common Shows</h3>
      {commonShows.length > 0 ? (
        <ul>
          {commonShows.map((show) => (
            <li key={show.id}>
              <strong>{show.name}</strong> - {show.genre}
              <p>{show.summary}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No common shows found between these two lists.</p>
      )}
    </>
  );
}

export default CompareLists;
