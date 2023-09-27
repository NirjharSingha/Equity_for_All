import React from "react";
import "./Story.css";
import { useNavigate } from "react-router-dom";
import StoryCard from "./StoryCard";

const Story = () => {
  const navigate = useNavigate();
  return (
    <div className="storyDiv">
      <StoryCard />
      <div
        className="storyBlock"
        onClick={() => navigate("/main/stories")}
      ></div>
      <div className="storyBlock"></div>
      <div className="storyBlock"></div>
      <div className="storyBlock" style={{ marginRight: "0" }}></div>
    </div>
  );
};

export default Story;
