import React from "react";
import "./DisplayStory.css";
import { FaPause } from "react-icons/fa6";
import { BsTriangleFill } from "react-icons/bs";
import { useStoryContext } from "../contexts/StoryContext";
import { FaLessThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";

const DisplayStory = () => {
  const story = {
    userEmail: "webprojecttest63@gmail.com",
    storyDescription: "abcd\nefgh",
    fontColor: "white",
    fontStyle: "fancy",
    backgroundImage:
      "http://localhost:5000/uploads/1696003690652-mdn-info2.png",
    backgroundColor: "rgb(9, 181, 181)",
    storyVisibility: "Anyone",
  };
  const paragraphs = story.storyDescription
    .split("\n")
    .map((paragraph, index) => (
      <React.Fragment key={index}>
        <p>{paragraph}</p>
      </React.Fragment>
    ));
  return (
    <div className="displayStoryContainer">
      <div className="storyArrawButton">
        <FaLessThan className="storyArraw" />
      </div>
      <div className="displayStory">
        <div className="progressBar"></div>
        <div className="storyCreator">
          <div className="storyCreatorPicContainer">
            <div className="storyCreatorPic"></div>
          </div>
          <div className="storyCreatorNameContainer">
            <p className="storyCreatorName">User Name</p>
            <p className="storyTime">story time</p>
          </div>
          <div className="displayStoryIcons">
            <p>...</p>
            <FaPause style={{ color: "white", cursor: "pointer" }} />
            <BsTriangleFill
              style={{
                color: "white",
                cursor: "pointer",
                fontSize: "0.75rem",
                rotate: "90deg",
              }}
            />
          </div>
        </div>
        <div
          className="storyContent"
          style={
            story.backgroundImage === ""
              ? {
                  backgroundColor: story.backgroundColor,
                }
              : {
                  backgroundImage: `url(${story.backgroundImage})`,
                  backgroundColor: "rgb(41, 40, 40)",
                  border: `2px solid rgb(41, 40, 40)`,
                }
          }
        >
          <span
            className="storySpan"
            style={{
              fontStyle: story.fontStyle === "fancy" ? "italic" : "normal",
              color: story.fontColor,
            }}
          >
            {paragraphs}
          </span>
        </div>
      </div>
      <div className="storyArrawButton">
        <FaGreaterThan className="storyArraw" />
      </div>
    </div>
  );
};

export default DisplayStory;
