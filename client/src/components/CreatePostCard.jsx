import React, { useState, useEffect } from "react";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import "./CreatePostCard.css";
import jwtDecode from "jwt-decode";

const CreatePostCard = ({ handleClick, message }) => {
  const { getUserInfo } = useUserInfoContext();
  const [userImg, setUserImg] = useState("");
  useEffect(() => {
    const displayUser = async () => {
      const { name, profilePic } = await getUserInfo(
        jwtDecode(localStorage.getItem("token")).email
      );
      setUserImg(profilePic);
    };
    displayUser();
  }, []);
  return (
    <div className="createPostCard">
      <div className="postContainerClass">
        <img
          src={userImg === "" ? "/profilePicIcon.svg" : userImg}
          className="postCardImage"
        />
        <div className="postCardInput" onClick={handleClick}>
          Write something...
        </div>
      </div>
      <p className="createPostMessage">{message}</p>
    </div>
  );
};

export default CreatePostCard;
