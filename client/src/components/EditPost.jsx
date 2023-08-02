import React from "react";
import CreatePost from "./CreatePost";
import { useEffect, useRef } from "react";
import { useEditPostContext } from "../contexts/EditPostContext";

const EditPost = ({ postToEdit }) => {
  const editPostRef = useRef(null);
  const { setEditPost } = useEditPostContext();
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
      <CreatePost postToEdit={postToEdit} />
    </div>
  );
};

export default EditPost;
