import React from "react";
import "./Animation.css";
import Lottie from "lottie-react";
import Story from "../lib/Story.json";
import Post from "../lib/Post.json";
import Group from "../lib/Group.json";
import Friend from "../lib/Friend.json";
import Chat from "../lib/Chat.json";
import LandingPage from "../lib/LandingPage.json";
import { useState, useEffect } from "react";

const Animation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const animations = [LandingPage, Story, Post, Friend, Group, Chat];
  const boldMessages = [
    "Welcome To Nexus Sphere",
    "Share Your Story",
    "Create Post",
    "Find New Friends",
    "Make Friend-Filled Groups",
    "Chat with Friends",
  ];
  const smallMessages = [
    "We trust that your visit to our website will provide you with a delightful browsing experience",
    "Our platform allows you to explore the stories and experiences of your friends",
    "Express your thoughts and emotions by creating and sharing your own posts",
    "Discover and connect with new individuals, forming meaningful friendships along the way",
    "Foster connections with those close to you by creating and joining groups, enabling continuous interaction",
    "Stay in touch with your acquaintances and gain insight into their well-being through our chat feature",
  ];
  const animationKey = `animation-${currentIndex}`;

  useEffect(() => {
    const switchToNextAnimation = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % animations.length);
    };
    const interval = setInterval(switchToNextAnimation, 5000); // Change animations every 5 seconds
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="animationContainer">
      <div className={`animationCard`}>
        <Lottie
          key={animationKey}
          animationData={animations[currentIndex]} // Relative path from the public folder
          loop={true}
          autoplay={true}
          className={`animation`}
        />
      </div>
      <p className="animationMessage">
        {boldMessages[currentIndex]} <br />
        <span className="smallText">{smallMessages[currentIndex]}</span>
      </p>
      <div className="animationIndex">
        <div
          className="animationDots"
          style={
            currentIndex === 0 ? { backgroundColor: "rgb(16, 162, 220)" } : {}
          }
        ></div>
        <div
          className="animationDots"
          style={
            currentIndex === 1 ? { backgroundColor: "rgb(16, 162, 220)" } : {}
          }
        ></div>
        <div
          className="animationDots"
          style={
            currentIndex === 2 ? { backgroundColor: "rgb(16, 162, 220)" } : {}
          }
        ></div>
        <div
          className="animationDots"
          style={
            currentIndex === 3 ? { backgroundColor: "rgb(16, 162, 220)" } : {}
          }
        ></div>
        <div
          className="animationDots"
          style={
            currentIndex === 4 ? { backgroundColor: "rgb(16, 162, 220)" } : {}
          }
        ></div>
        <div
          className="animationDots"
          style={
            currentIndex === 5 ? { backgroundColor: "rgb(16, 162, 220)" } : {}
          }
        ></div>
      </div>
    </div>
  );
};

export default Animation;
