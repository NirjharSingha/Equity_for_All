import React from "react";
import "./UpdateProfile.css";
import { useEffect, useState } from "react";
import Register from "./Register";

const UpdateProfile = ({ handleMount }) => {
  const [showUpdateProfile, setShowUpdateProfile] = useState(true);

  useEffect(() => {
    console.log("profile update component loaded");
  }, []);

  return (
    <div className="updateProfileContainer">
      <div className="updateProfileCrossContainer">
        <button className="updateProfileCross" onClick={handleMount}>
          X
        </button>
      </div>
      <Register isReg={false} handleMount={handleMount} />
    </div>
  );
};

export default UpdateProfile;
