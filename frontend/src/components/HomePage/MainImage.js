import React from "react";
import "./MainImage.css";

function MainImage() {

  return (
    <div>
     <main className="homepage">
      <div className="main-image-container">
        <img src="/mainPicture.jpeg" alt="Main Feature" className="main-image" />
        <div className="overlay-text">Never wonder what to watch next...</div>
      </div>
      <hr />
     </main>
    </div>
  );
}

export default MainImage;


