import React from "react";
import "./Groups.css";
import { useEffect } from "react";
import PreviewStory from "./PreviewStory";
import UserSession from "./UserSession";
import CreateStory from "./CreateStory";
import DisplayStory from "./DisplayStory";
import ItemCard from "./ItemCard";
import CreateGroup from "./CreateGroup";
import { useGroupContext } from "../contexts/GroupContext";

const Home = () => {
  const { showCreateGroup } = useGroupContext();
  useEffect(() => {
    console.log("group component loaded");
  }, []);

  return (
    <div className="homeDiv">
      {showCreateGroup && <CreateGroup />}
      <div className="homeContainer"></div>
    </div>
  );
};

export default Home;
