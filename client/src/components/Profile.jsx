import React from "react";
import "./Profile.css";
import { useEffect, useState } from "react";
import UpdateProfile from "./UpdateProfile";
import axios from "axios";

const Profile = ({ own }) => {
  const [profileData, setProfileData] = useState({});

  const fetchProfileData = async () => {
    console.log("fetching profile data");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/user/profile", {
        headers: {
          token: token,
        },
      });
      setProfileData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("profile component loaded");
    fetchProfileData();
  }, []);

  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);

  const handleUpdateProfile = () => {
    console.log("handle mount is called");
    setShowUpdateProfile((prevState) => !prevState);
  };

  useEffect(() => {
    if (shouldFetch == true) {
      fetchProfileData();
      setShouldFetch(false);
    }
  }, [shouldFetch]);

  return (
    <>
      {showUpdateProfile && (
        <UpdateProfile
          profileData={profileData}
          handleMount={handleUpdateProfile}
          fetchProfileData={setShouldFetch}
        />
      )}
      <div className="profileContainer">
        <div className="profileImageContainer">
          <img src={profileData.profilePic} className="profileImage" />
        </div>
        <div
          className={
            own ? "profileInfoContainer" : "friendProfileInfoContainer"
          }
        >
          <div className="profileInfo">
            <div className="profileLine">
              Name:
              <span className="profileAns">{profileData.name}</span>
            </div>
            <div className="profileLine">
              Email: <span className="profileAns">{profileData.email}</span>
            </div>
            <div className="profileLine">
              Gender: <span className="profileAns">{profileData.gender}</span>
            </div>
            <div className="profileLine">
              Country: <span className="profileAns">{profileData.country}</span>
            </div>
            <div className="profileLine">
              City: <span className="profileAns">{profileData.city}</span>
            </div>
            <div className="profileLine">
              Date of Birth:
              <span className="profileAns">
                {profileData.dob != null && profileData.dob !== ""
                  ? profileData.dob.substring(0, 10)
                  : profileData.dob}
              </span>
            </div>
            <div className="profileLine">
              School:<span className="profileAns">{profileData.school}</span>
            </div>
            <div className="profileLine">
              College:<span className="profileAns">{profileData.college}</span>
            </div>
            <div className="profileLine">
              University:
              <span className="profileAns">{profileData.university}</span>
            </div>
            <div className="profileLine">
              Workplace:
              <span className="profileAns">{profileData.workplace}</span>
            </div>
            <div className="profileLine">
              Contact number:
              <span className="profileAns">{profileData.contactNumber}</span>
            </div>
            <div className="profileLine">
              Relationship status:
              <span className="profileAns">
                {profileData.relationshipStatus}
              </span>
            </div>
            <div className="profileLine">
              Profile status:
              <span className="profileAns">{profileData.profileStatus}</span>
            </div>
            <div className="profileLine">Why are you on this website:</div>
            <div className="profileEassy">{profileData.reasonOfBeingHere}</div>
            <div className="profileLine">About Yourself:</div>
            <div className="profileEassy">{profileData.aboutYourself}</div>
          </div>
          {own && (
            <div className="updateProfileButtonContainer">
              <button
                className="profileUpdateButton"
                onClick={handleUpdateProfile}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
