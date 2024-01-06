import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";
import "./SharePage.css";

const SharePage = () => {
  const location = useLocation();
  const [postID, setPostID] = useState("");
  const [post, setPost] = useState({ name: "User Name", profilePic: "" });

  const fetchPostDetails = async (postID) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/post/getSharedPost/${postID}`
      );
      if (response) {
        const _post = response.data;
        setPost(_post);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    try {
      setPostID(location.pathname.split("/share/")[1]);
    } catch (error) {
      console.log(error);
    }
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
