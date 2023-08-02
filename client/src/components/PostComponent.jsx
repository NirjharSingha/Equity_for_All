import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Chat from "./Chat";
import Posts from "./Posts";
import Groups from "./Groups";
import "../pages/MainPage.css";
import CreatePost from "./CreatePost";
import { useEditPostContext } from "../contexts/EditPostContext";

const PostComponent = () => {
  const { editPost } = useEditPostContext();
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
