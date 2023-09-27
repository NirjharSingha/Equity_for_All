import React from "react";
import "./Groups.css";
import { useEffect } from "react";
import Loading from "./Loading";
import Story from "./Story";
import PreviewStory from "./PreviewStory";
import StoryCard from "./StoryCard";

const Home = () => {
  useEffect(() => {
    console.log("group component loaded");
  }, []);

  return (
    <div className="homeDiv">
      <div className="homeContainer">
        <PreviewStory />
      </div>
    </div>
  );
};

export default Home;
