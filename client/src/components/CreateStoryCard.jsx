import React from "react";
import "./CreateStoryCard.css";
import { useState, useEffect } from "react";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { LuPlusCircle } from "react-icons/lu";

const CreateStoryCard = () => {
  const navigate = useNavigate();
  const { getUserInfo } = useUserInfoContext();
  const [userImg, setUserImg] = useState("");

  useEffect(() => {
    const displayStoryUser = async () => {
      const decodedToken = jwtDecode(localStorage.getItem("token"));
      const { profilePic } = await getUserInfo(decodedToken.email);
      setUserImg(profilePic);
    };

    displayStoryUser();
  }, []);

  return (
    <div
      className="createStoryCard"
      onClick={() => navigate("/main/createStory")}
    >
      {userImg === "" ? (
        <div className="createStoryUserPic" />
      ) : (
        <img src={userImg} className="createStoryUserPic" />
      )}
      <LuPlusCircle className="createStoryPlus" />
      <p className="createStoryText">Create Story</p>
    </div>
  );
};

export default CreateStoryCard;
