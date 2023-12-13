import React from "react";
import "./Posts.css";
import EditPost from "./EditPost";
import { usePostContext } from "../contexts/PostContext";
import OtherPosts from "./OtherPosts";
import YourPosts from "./YourPosts";
import { useEffect } from "react";

const Posts = () => {
  const { showYourPost, setShowYourPost } = usePostContext();
  useEffect(() => {
    return () => {
      setShowYourPost(false);
    };
  }, []);

  return (
    <div className="postDiv">
      <div className="postOption">
        <button
          className={
            showYourPost ? "selectedPostOption" : "borderLessPostOption"
          }
          onClick={() => setShowYourPost(true)}
        >
          Your Post
        </button>
        <button
          className={
            !showYourPost ? "selectedPostOption" : "borderLessPostOption"
          }
          onClick={() => setShowYourPost(false)}
        >
          Other Post
        </button>
      </div>
      {!showYourPost && <OtherPosts />}
      {showYourPost && <YourPosts />}
    </div>
  );
};
export default Posts;
