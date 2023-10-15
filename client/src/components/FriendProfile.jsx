import React from "react";
import { useEffect } from "react";
import Profile from "./Profile";
import { useFriendContext } from "../contexts/FriendContext";
import "./FriendProfile.css";

const FriendProfile = ({ setShowFriendProfile, profileCode, friendEmail }) => {
  const { friendProfileRef } = useFriendContext();

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
    <div className="friendProfileBlurContainer" ref={friendProfileRef}>
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
