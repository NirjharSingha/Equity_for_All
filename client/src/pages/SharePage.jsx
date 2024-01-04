import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";
import "./SharePage.css";

const SharePage = () => {
  const location = useLocation();
  const [postID, setPostID] = useState("");
  const [post, setPost] = useState({});

  const fetchPostDetails = async (postID) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/post/getSharedPost/${postID}`
      );
      if (response) {
        const post = response.data;
        setPost(post);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    setPostID(location.pathname.split("/share/")[1]);
  }, [location]);

  useEffect(() => {
    if (postID) {
      fetchPostDetails(postID);
    }
  }, [postID]);

  return (
    <div className="sharePage">
      <PostCard post={post} shareFlag={true} />
    </div>
  );
};

export default SharePage;
