import React from "react";
import "./Home.css";
import { useEffect } from "react";
import WelcomeCard from "./WelcomeCard";

const Home = () => {
  useEffect(() => {
    console.log("home component loaded");
  }, []);

  return (
    <div className="homeDiv">
      <div className="homeContainer">
        <WelcomeCard />
        <h1 className="storyHeading">Top stories for you</h1>
        <div className="homeStories"></div>
      </div>
    </div>
  );
};

export default Home;
