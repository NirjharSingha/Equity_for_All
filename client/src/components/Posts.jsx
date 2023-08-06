import React, { useRef, useState } from "react";
import "./Posts.css";
import { useEffect } from "react";
import PostCard from "./PostCard";
import axios from "axios";
import EditPost from "./EditPost";
import { usePostContext } from "../contexts/PostContext";

const Posts = () => {
  const { postArray, setPostArray } = usePostContext();
  const { editPost } = usePostContext();

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/post/all", {
          headers: {
            token: token,
          },
        });
        const posts = response.data.reverse();
        setPostArray(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchAllPosts();
  }, []);

  const [showYourPost, setShowYourPost] = useState(false);

  return (
    <div className="postDiv">
      {editPost && <EditPost />}
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
        {postArray.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
