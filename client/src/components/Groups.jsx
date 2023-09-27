import React from "react";
import "./Groups.css";
import { useEffect } from "react";
import Loading from "./Loading";
import Story from "./Story";
import PreviewStory from "./PreviewStory";
import StoryCard from "./StoryCard";
import { useFileContext } from "../contexts/FileContext";

const Home = () => {
  const { deleteFile } = useFileContext();
  useEffect(() => {
    console.log("group component loaded");
    deleteFile(
      "http://localhost:5000/uploads/1694732763677-Screenshot from 2023-09-11 00-15-18.png"
    );
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
