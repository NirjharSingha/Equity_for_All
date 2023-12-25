import React from "react";
import "./Story.css";
import { useNavigate } from "react-router-dom";
import StoryCard from "./StoryCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useGlobals } from "../contexts/Globals";
import CreateStoryCard from "./CreateStoryCard";
import { useStoryContext } from "../contexts/StoryContext";
import jwtDecode from "jwt-decode";
import { useFileContext } from "../contexts/FileContext";
import Loading from "./Loading";

const Story = () => {
  const { setIsValidJWT } = useGlobals();
  const { deleteFile } = useFileContext();
  const {
    shouldFetchYourStories,
    setshouldFetchYourStories,
    shouldFetchOtherStories,
    setshouldFetchOtherStories,
    otherStories,
    setOtherStories,
    setStoryKeys,
  } = useStoryContext();
  const email = jwtDecode(localStorage.getItem("token")).email;
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const fetchYourStories = async () => {
      try {
        setShowLoading(true);
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
          if (response.data.stories[email].length > 0) {
            setOtherStories((prev) => ({ ...prev, ...response.data.stories }));
          }
          if (response.data.filesToDelete.length > 0) {
            deleteFile(response.data.filesToDelete);
          }
          setshouldFetchYourStories(false);
          setShowLoading(false);
        }
      } catch (error) {
        if (error.response.status === 401) {
          console.log("inside status code");
          setIsValidJWT(false);
        }
        console.log(error);
      }
    };
    const fetchOtherStories = async () => {
      try {
        setShowLoading(true);
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
          setOtherStories((prev) => ({ ...prev, ...response.data }));
          console.log(response.data);
          setshouldFetchOtherStories(false);
          setShowLoading(false);
        }
      } catch (error) {
        if (error.response.status === 401) {
          console.log("inside status code");
          setIsValidJWT(false);
        }
        console.log(error);
      }
    };

    if (shouldFetchYourStories) {
      fetchYourStories();
    }
    if (!shouldFetchYourStories && shouldFetchOtherStories) {
      fetchOtherStories();
    }

    console.log(otherStories);
  }, [shouldFetchYourStories, setshouldFetchOtherStories]);

  useEffect(() => {
    const arrayKeys = Object.keys(otherStories);
    setStoryKeys(arrayKeys);
    console.log(arrayKeys);
  }, [otherStories]);

  return (
    <div className="storyDiv">
      <CreateStoryCard />
      {showLoading && <Loading />}
      {Object.keys(otherStories).map(
        (userEmail) =>
          otherStories[userEmail].length > 0 && (
            <StoryCard key={userEmail} story={otherStories[userEmail][0]} />
          )
      )}
    </div>
  );
};

export default Story;
