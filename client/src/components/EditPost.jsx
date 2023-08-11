import React from "react";
import CreatePost from "./CreatePost";
import { useEffect, useRef } from "react";
import { usePostContext } from "../contexts/PostContext";
import "./EditPost.css";

const EditPost = () => {
  const editPostRef = useRef(null);
  const { setEditPost, selectedPost } = usePostContext();
  useEffect(() => {
    console.log("edit post loaded");
    const handleOutsideClick = (event) => {
      if (editPostRef.current && !editPostRef.current.contains(event.target)) {
        setEditPost(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <div className="blurComponent" ref={editPostRef}>
      <div className="editPostCross" onClick={() => setEditPost(false)}>
        X
      </div>
      <div className="editPostContainer">
        <CreatePost />
      </div>
    </div>
  );
};

export default EditPost;
