import React from "react";
import "./Groups.css";
import { useEffect } from "react";
import PreviewStory from "./PreviewStory";

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
