import React from "react";
import { useState } from "react";
import FriendProfile from "./FriendProfile";
import "./PersonCard.css";
import { useFriendContext } from "../contexts/FriendContext";

const PersonCard = () => {
  const { showFriendProfile, setShowFriendProfile } = useFriendContext();
  return (
    <div>
      {showFriendProfile && <FriendProfile />}
      <div className="personCardContainer">
        <img
          src="http://localhost:5000/uploads/1691885027943-Screenshot from 2023-08-04 11-09-25.png"
          alt=""
          className="personImg personCardElement"
          onClick={() => setShowFriendProfile(true)}
        />
        <h3 style={{ overflow: "hidden" }}>Demo Name</h3>
        <p>4 mutual friends</p>
        <button className="personCardButton personCardElement">
          Add Friend
        </button>
        <button className="personCardButton personCardElement">Follow</button>
        <button className="personCardButton personCardElement">Remove</button>
        <button className="personCardButton personCardElement">Block</button>
      </div>
    </div>
  );
};

export default PersonCard;
