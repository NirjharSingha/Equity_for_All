import React from "react";
import "./CreateStoryMobile.css";
import CreateStory from "./CreateStory";
import PreviewStory from "./PreviewStory";

const CreateStoryMobile = () => {
  return (
    <div className="mobileStoryContainer">
      <PreviewStory />
      <CreateStory />
    </div>
  );
};

export default CreateStoryMobile;
