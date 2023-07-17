import React, { useRef, useState } from "react";
import "./Posts.css";
import { useEffect } from "react";
import PostCard from "./PostCard";
import Share from "./Share";

const Post = () => {
  const shareComponentRef = useRef(null);
  useEffect(() => {
    console.log("post component loaded");

    const handleOutsideClick = (event) => {
      if (
        shareComponentRef.current &&
        !shareComponentRef.current.contains(event.target)
      ) {
        setShowPostShare(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const [showPostShare, setShowPostShare] = useState(false);

  return (
    <div className="postDiv">
      <div className="postOption">
        <button className="borderLessPostOption">Your Post</button>
        <button className="borderLessPostOption">Other Post</button>
      </div>
      <div className="postContainer">
        {showPostShare && (
          <div ref={shareComponentRef}>
            <Share />
          </div>
        )}
        <PostCard setShowPostShare={setShowPostShare} />
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
