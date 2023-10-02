import React from "react";
import "./DisplayStory.css";
import { FaPause } from "react-icons/fa6";
import { BsTriangleFill } from "react-icons/bs";
import { useStoryContext } from "../contexts/StoryContext";
import { FaLessThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DisplayStory = () => {
  const { storyToDisplay, otherStories, storyKeys, setStoryToDisplay } =
    useStoryContext();
  const navigate = useNavigate();
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
  let paragraphs;
  if (storyToDisplay.storyDescription !== undefined) {
    paragraphs = storyToDisplay.storyDescription
      .split("\n")
      .map((paragraph, index) => (
        <React.Fragment key={index}>
          <p>{paragraph}</p>
        </React.Fragment>
      ));
  }
  useEffect(() => {
    if (Object.keys(storyToDisplay).length === 0) {
      navigate("/main");
    }
  }, [storyToDisplay]);

  const handleStoryChange = (flag) => {
    if (Object.keys(storyToDisplay).length !== 0) {
      let currentKeyIndex = storyKeys.indexOf(storyToDisplay.userEmail);
      let userStoriesArray = otherStories[storyToDisplay.userEmail] || [];
      let currentStoryIndex = userStoriesArray.findIndex(
        (story) => story._id === storyToDisplay._id
      );

      if (flag === 1) {
        if (currentStoryIndex === userStoriesArray.length - 1) {
          currentKeyIndex = (currentKeyIndex + 1) % storyKeys.length;
          setStoryToDisplay(otherStories[storyKeys[currentKeyIndex]][0]);
        } else {
          console.log(otherStories);
          console.log(currentKeyIndex);
          setStoryToDisplay(
            otherStories[storyKeys[currentKeyIndex]][currentStoryIndex + 1]
          );
        }
      } else {
        if (currentStoryIndex === 0) {
          currentKeyIndex =
            (currentKeyIndex - 1 + storyKeys.length) % storyKeys.length;
          const lengthOfArray = otherStories[storyKeys[currentKeyIndex]].length;
          setStoryToDisplay(
            otherStories[storyKeys[currentKeyIndex]][lengthOfArray - 1]
          );
        } else {
          setStoryToDisplay(
            otherStories[storyKeys[currentKeyIndex]][currentStoryIndex - 1]
          );
        }
      }
    }
  };
  return (
    <div className="displayStoryContainer">
      <div className="storyArrawButton" onClick={() => handleStoryChange(-1)}>
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
            storyToDisplay.backgroundImage === ""
              ? {
                  backgroundColor: storyToDisplay.backgroundColor,
                }
              : {
                  backgroundImage: `url(${storyToDisplay.backgroundImage})`,
                  backgroundColor: "rgb(41, 40, 40)",
                  border: `2px solid rgb(41, 40, 40)`,
                }
          }
        >
          <span
            className="storySpan"
            style={{
              fontStyle:
                storyToDisplay.fontStyle === "fancy" ? "italic" : "normal",
              color: storyToDisplay.fontColor,
            }}
          >
            {paragraphs}
          </span>
        </div>
      </div>
      <div className="storyArrawButton" onClick={() => handleStoryChange(1)}>
        <FaGreaterThan className="storyArraw" />
      </div>
    </div>
  );
};

export default DisplayStory;
