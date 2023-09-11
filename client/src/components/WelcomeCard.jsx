import React from "react";
import "./WelcomeCard.css";
import Lottie from "lottie-react";
import HomeWelcome from "../lib/HomeWelcome.json";

const WelcomeCard = () => {
  return (
    <div className="welcomeCard">
      <Lottie
        animationData={HomeWelcome} // Relative path from the public folder
        loop
        autoplay
        className="logo"
      />
    </div>
  );
};

export default WelcomeCard;
