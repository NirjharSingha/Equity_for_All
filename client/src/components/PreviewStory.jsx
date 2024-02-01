import React from "react";
import "./PreviewStory.css";
import { useStoryContext } from "../contexts/StoryContext";
import { useState, useEffect } from "react";

const PreviewStory = () => {
  const {
    selectedBg,
    fontStyleVar,
    fontColor,
    bgColors,
    selectedFile,
    inputValue,
    crossFlag,
    storyToDisplay,
    bgImgHandler,
  } = useStoryContext();
  const [paragraphs, setParagraphs] = useState();
  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    setParagraphs(
      inputValue.split("\n").map((paragraph, index) => (
        <React.Fragment key={index}>
          <p>{paragraph}</p>
        </React.Fragment>
      ))
    );
  }, [inputValue]);

  useEffect(() => {
    if (crossFlag && !bgImgHandler) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
    }
  }, [selectedFile]);

  return (
    <div className="previewStory">
      <div className="previewStoryHeading">
        <p>Preview</p>
      </div>
      <div className="previewDiv">
        <div
          className="displayStoryPreview"
          style={
            !crossFlag
              ? {
                  backgroundColor: bgColors[selectedBg],
                }
              : {
                  backgroundImage: bgImgHandler
                    ? `url(${storyToDisplay.backgroundImage})`
                    : `url(${selectedImage})`,
                  backgroundColor: "black",
                  border: `2px solid black`,
                }
          }
        >
          <span
            className="storySpan"
            style={{
              fontStyle: fontStyleVar === "fancy" ? "italic" : "normal",
              color: fontColor,
            }}
          >
            {paragraphs}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PreviewStory;
