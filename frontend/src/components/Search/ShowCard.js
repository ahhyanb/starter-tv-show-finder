// components/ShowCard.js
function ShowCard({ show }) {
    return (
      <div className="show-card">
        <h3>{show.name}</h3>
        {show.image?.medium && <img src={show.image.medium} alt={show.name} />}
        <p>{show.summary?.replace(/<[^>]*>/g, "")}</p>
        <ul>
          <li><strong>Genres:</strong> {show.genres.join(", ")}</li>
          <li><strong>Rating:</strong> {show.rating?.average || "N/A"}</li>
          <li><strong>Language:</strong> {show.language}</li>
          <li><strong>Status:</strong> {show.status}</li>
          <li><strong>Runtime:</strong> {show.runtime} minutes</li>
          <li><strong>Premiered:</strong> {show.premiered}</li>
        </ul>
      </div>
    );
  }
  
  export default ShowCard;
  