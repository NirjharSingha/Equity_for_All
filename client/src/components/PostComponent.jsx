import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Posts from "./Posts";
import Groups from "./Groups";
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
        {" "}
        <CreatePost />{" "}
      </div>
      {pathname === "/main/posts" && (
        <div className="mainComponent">
          {" "}
          <Posts />{" "}
        </div>
      )}
      {pathname !== "/main/posts" && (
        <div className="mainComponent">
          {" "}
          <Groups />{" "}
        </div>
      )}
    </>
  );
};

export default PostComponent;
