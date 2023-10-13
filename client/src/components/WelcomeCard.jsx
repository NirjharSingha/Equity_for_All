import React from "react";
import "./WelcomeCard.css";
import Lottie from "lottie-react";
import HomeWelcome from "../lib/m.json";

const WelcomeCard = () => {
  return (
    <div className="animation">
      <div className="welcomeCard">
        <Lottie
          animationData={HomeWelcome} // Relative path from the public folder
          loop
          autoplay
          className="logo"
        />
      </div>
      <div className="animationMessage">Hello user</div>
    </div>
  );
};

export default WelcomeCard;
