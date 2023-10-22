import React from "react";
import "./Groups.css";
import { useEffect } from "react";
import CreateGroup from "./CreateGroup";
import { useGroupContext } from "../contexts/GroupContext";
import CreatePostCard from "./CreatePostCard";

const Home = () => {
  const { showCreateGroup } = useGroupContext();
  useEffect(() => {
    console.log("group component loaded");
  }, []);

  return (
    <div className="homeDiv">
      {showCreateGroup && <CreateGroup />}
      <div className="groupContainer">
        <img src="/group.png" className="groupImage"></img>
        <div className="groupInfo">
          <p className="grpName">Group Name</p>
          <div className="friendsInGrp">
            <div className="grpFriend"></div>
            <div className="grpFriend"></div>
            <div className="grpFriend"></div>
            <div className="grpFriend"></div>
          </div>
          <p style={{ marginBottom: "0.5rem" }}>Your x friends are members</p>
          <hr />
          <div className="grpOptionBtn">
            <button className="grpPageBtn">Stream</button>
            <button className="grpPageBtn">Members</button>
            <button className="grpPageBtn">Invites</button>
          </div>
        </div>
        <div className="grpPost">
          <CreatePostCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
