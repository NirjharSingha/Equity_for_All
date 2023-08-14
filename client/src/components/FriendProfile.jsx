import React from "react";
import { useEffect, useState, useRef } from "react";
import Profile from "./Profile";
import { useFriendContext } from "../contexts/FriendContext";

const FriendProfile = () => {
  const { showFriendProfile, setShowFriendProfile, friendProfileRef } =
    useFriendContext();

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
        <Profile own={false} />
      </div>
    </div>
  );
};

export default FriendProfile;
