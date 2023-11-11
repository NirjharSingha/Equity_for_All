import React, { useState } from "react";
import "./CreatePostCard.css";

const CreatePostCard = ({ handleClick }) => {
  return (
    <div className="createPostCard">
      <div className="postContainerClass">
        <div className="postCardImage"></div>
        <div className="postCardInput" onClick={handleClick}>
          Write something...
        </div>
      </div>
    </div>
  );
};

export default CreatePostCard;
