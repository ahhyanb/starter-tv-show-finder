import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ShowDetails() {
     
    const {showId}  = useParams();
    const [showDetails, setShowDetails] = useState(null);

    useEffect(() => {

        const fetchDetails = async () => {
            try {
                const BASE_URL = "https://api.tvmaze.com/"
                const response = await axios.get(`${BASE_URL}shows/${showId}`);
                setShowDetails(response.data);
            } catch(error) {
                console.error("There was an error fetching the show details.", error);
            }
        }

        fetchDetails();

    }, [showId] );

      // If the details are not loaded yet, show a loading message
    if (!showDetails) return <p>Loading show details...</p>;


    // async function fetchDetails(showId) {
    //     try {
    //         const BASE_URL = "https://api.tvmaze.com/"
    //         const response = await axios.get(`${BASE_URL}$shows/{showId}`);
    //         setShowDetails(response.data);
    //     } catch(error) {
    //         console.error("Failed to fetch the show details", error);
    //     }

    // }

    return (
        <div>
          <h1>{showDetails.name}</h1>
      
          {/* Show Image */}
          {showDetails.image?.medium && (
            <img src={showDetails.image.medium} alt={showDetails.name} />
          )}
      
          {/* Summary */}
          <p>{showDetails.summary.replace(/<[^>]*>/g, "")}</p>
      
          {/* Additional Details */}
          <ul>
            <li><strong>Genres:</strong> {showDetails.genres.join(", ")}</li>
            <li><strong>Rating:</strong> {showDetails.rating?.average || "N/A"}</li>
            <li><strong>Language:</strong> {showDetails.language}</li>
            <li><strong>Status:</strong> {showDetails.status}</li>
            <li><strong>Runtime:</strong> {showDetails.runtime} minutes</li>
            <li>
              <strong>Premiered:</strong> {showDetails.premiered}
            </li>
            {showDetails.officialSite && (
              <li>
                <strong>Official Site:</strong> 
                <a href={showDetails.officialSite} target="_blank" rel="noreferrer">
                  Visit Here
                </a>
              </li>
            )}
          </ul>
        </div>
      );
      
}

export default ShowDetails;