import React, { useRef, useState } from "react";
import "./Posts.css";
import { useEffect } from "react";
import PostCard from "./PostCard";
import Share from "./Share";
import axios from "axios";

const Post = () => {
  const shareComponentRef = useRef(null);
  const [postArray, setPostArray] = useState([]);

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

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/post/all", {
          headers: {
            token: token,
          },
        });
        setPostArray(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchAllPosts();
  }, []);

  const [showPostShare, setShowPostShare] = useState(false);
  const [showYourPost, setShowYourPost] = useState(false);

  return (
    <div className="postDiv">
      <div className="postOption">
        <button
          className="borderLessPostOption"
          onClick={() => setShowYourPost(true)}
        >
          Your Post
        </button>
        <button className="borderLessPostOption">Other Post</button>
      </div>
      <div className="postContainer">
        {showPostShare && (
          <div ref={shareComponentRef}>
            <Share />
          </div>
        )}
        {postArray.map((post) => (
          <PostCard
            key={post._id}
            setShowPostShare={setShowPostShare}
            post={post}
          />
        ))}
      </div>
    </div>
  );
};

export default Post;
