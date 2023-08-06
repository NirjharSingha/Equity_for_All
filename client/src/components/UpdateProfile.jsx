import React from "react";
import "./UpdateProfile.css";
import { useEffect, useRef } from "react";
import Register from "./Register";

const UpdateProfile = ({ profileData, handleMount, fetchProfileData }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    console.log("update profile component loaded");

    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        handleMount();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="updateProfileContainer" ref={containerRef}>
      <div className="updateProfileCrossContainer">
        <button className="updateProfileCross" onClick={handleMount}>
          X
        </button>
      </div>
      <Register
        isReg={false}
        profileData={profileData}
        handleMount={handleMount}
        fetchProfileData={fetchProfileData}
      />
    </div>
  );
};

export default UpdateProfile;
