import React from "react";
import "./Story.css";
import { useNavigate } from "react-router-dom";
import StoryCard from "./StoryCard";
import { useState, useEffect } from "react";
import axios from "axios";

const Story = () => {
  const navigate = useNavigate();
  const [yourStories, setYourStories] = useState([]);
  const [otherStories, setOtherStories] = useState([]);

  useEffect(() => {
    const fetchYourStories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/story/getYourStories`,
          {
            headers: {
              token: token,
            },
          }
        );
        if (response) {
          setYourStories(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchOtherStories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/story/getOtherStories`,
          {
            headers: {
              token: token,
            },
          }
        );
        if (response) {
          setOtherStories(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchYourStories();
    fetchOtherStories();
  }, []);

  return (
    <div className="storyDiv">
      {yourStories.length > 0 && (
        <StoryCard story={yourStories[0]} isYourStory={true} />
      )}
      {Object.keys(otherStories).map((userEmail) => (
        <StoryCard
          key={userEmail}
          story={otherStories[userEmail][0]}
          isYourStory={false}
        />
      ))}
    </div>
  );
};

export default Story;
