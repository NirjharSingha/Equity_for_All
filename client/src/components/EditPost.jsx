import React from "react";
import CreatePost from "./CreatePost";
import { useEffect, useRef } from "react";
import { usePostContext } from "../contexts/PostContext";

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
    <div className="editPostContainer" ref={editPostRef}>
      <CreatePost />
    </div>
  );
};

export default EditPost;
