import React from "react";
import "./Posts.css";
import { useEffect } from "react";
import PostCard from "./PostCard";

const Post = () => {
  useEffect(() => {
    console.log("post component loaded");
  }, []);

  return (
    <div className="postDiv">
      <div className="postOption">
        <button className="borderLessPostOption">Your Post</button>
        <button className="borderLessPostOption">Other Post</button>
      </div>
      <div className="postContainer">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />{" "}
      </div>
    </div>
  );
};

export default Post;
