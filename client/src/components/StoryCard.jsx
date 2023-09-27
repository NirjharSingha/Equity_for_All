import React from "react";
import "./StoryCard.css";
import { useStoryContext } from "../contexts/StoryContext";
import { useState, useEffect } from "react";

const StoryCard = () => {
  const story = {
    userEmail: "webprojecttest63@gmail.com",
    storyDescription: "faghsjsjkak\nHYUUUJJN",
    fontColor: "blue",
    fontStyle: "fancy",
    backgroundImage: "http://localhost:5000/uploads/1695748348414-people.png",
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
    <div className="storyCard">
      <div
        className="storyCardPreview"
        style={
          story.backgroundImage === ""
            ? { backgroundColor: story.backgroundColor }
            : { backgroundImage: `url(${story.backgroundImage})` }
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
  );
};

export default StoryCard;
