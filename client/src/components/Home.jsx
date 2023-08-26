import React from "react";
import "./Home.css";
import { useEffect } from "react";
import Lottie from "lottie-react";
import HomeWelcome from "../lib/HomeWelcome.json";

const Home = () => {
  useEffect(() => {
    console.log("home component loaded");
  }, []);

  return (
    <div className="homeDiv">
      <div className="homeContainer">
        <Lottie animationData={HomeWelcome} loop autoplay className="logo" />
      </div>
    </div>
  );
};

export default Home;
