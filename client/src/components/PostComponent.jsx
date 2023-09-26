import React from "react";
import { useLocation } from "react-router-dom";
import Posts from "./Posts";
import "../pages/MainPage.css";
import CreatePost from "./CreatePost";
import { usePostContext } from "../contexts/PostContext";

const PostComponent = () => {
  const { editPost } = usePostContext();
  const { pathname } = useLocation();
  return (
    <>
      {editPost && <div className="blurComponent"></div>}
      <div className="leftComponent">
        <CreatePost />
      </div>
      {pathname === "/main/posts" && (
        <div className="mainComponent">
          <Posts />
        </div>
      )}
    </>
  );
};

export default PostComponent;
