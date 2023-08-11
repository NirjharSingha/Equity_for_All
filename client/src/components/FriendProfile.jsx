import React from "react";
import { useEffect, useState, useRef } from "react";
import Profile from "./Profile";

const FriendProfile = ({ setShowFriendProfile }) => {
  const friendProfileRef = useRef(null);

  useEffect(() => {
    console.log("friend profile component loaded");
    const handleOutsideClick = (event) => {
      if (
        friendProfileRef.current &&
        !friendProfileRef.current.contains(event.target)
      ) {
        setShowFriendProfile(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="friendProfileBlurContainer">
      <div className="friendProfileContainer" ref={friendProfileRef}>
        <div className="updateProfileCrossContainer">
          <button
            className="updateProfileCross"
            onClick={() => setShowFriendProfile(false)}
          >
            X
          </button>
        </div>
        <Profile own={false} />
      </div>
    </div>
  );
};

export default FriendProfile;
