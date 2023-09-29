import React from "react";
import "./Groups.css";
import { useEffect } from "react";
import PreviewStory from "./PreviewStory";
import UserSession from "./UserSession";
import CreateStory from "./CreateStory";

const Home = () => {
  useEffect(() => {
    console.log("group component loaded");
  }, []);

  return (
    <div className="homeDiv">
      <div className="homeContainer">
        <PreviewStory />
        {/* <CreateStory /> */}
        {/* <UserSession /> */}
      </div>
    </div>
  );
};

export default Home;
