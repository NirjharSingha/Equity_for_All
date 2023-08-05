import React from "react";
import "./PersonCard.css";

const PersonCard = () => {
  return (
    <div className="personCardContainer">
      <img
        src="http://localhost:5000/uploads/1690475843217-curriculum.png"
        alt=""
        className="personImg personCardElement"
      />
      <h3 style={{ overflow: "hidden" }}>Demo Name</h3>
      <p>4 mutual friends</p>
      <button className="personCardButton personCardElement">Add Friend</button>
      <button className="personCardButton personCardElement">Remove</button>
      <button className="personCardButton personCardElement">Block</button>
    </div>
  );
};

export default PersonCard;
