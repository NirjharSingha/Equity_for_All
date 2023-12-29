import React from "react";
import { useEffect } from "react";
import Profile from "./Profile";
import "./FriendProfile.css";

const FriendProfile = ({ setShowFriendProfile, profileCode, friendEmail }) => {
  useEffect(() => {
    console.log("friend profile component loaded");
  }, []);

  return (
    <div className="fullScreenBlur">
      <div className="friendProfileContainer">
        <Profile
          profileCode={profileCode}
          setShowFriendProfile={setShowFriendProfile}
          friendEmail={friendEmail}
        />
      </div>
    </div>
  );
};

export default FriendProfile;
