import React from "react";
import { useLocation } from "react-router-dom";
import Posts from "./Posts";
import "../pages/MainPage.css";
import CreatePost from "./CreatePost";
import { usePostContext } from "../contexts/PostContext";
import { useGlobals } from "../contexts/Globals";

const PostComponent = () => {
  const { editPost } = usePostContext();
  const { pathname } = useLocation();
  const { windowWidth } = useGlobals();
  return (
    <>
      {editPost && <div className="blurComponent"></div>}
      <div className="leftComponent">
        {windowWidth >= 800 && <CreatePost />}
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
