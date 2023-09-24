import React from "react";
import "./PreviewStory.css";

const PreviewStory = () => {
  return (
    <div className="previewStory">
      <div className="previewStoryHeading">
        <p>Preview</p>
      </div>
      <div className="previewDiv">
        <div className="displayStoryPreview"></div>
      </div>
    </div>
  );
};

export default PreviewStory;
