import React from "react";
import "./Posts.css";
import { useEffect, useState, useRef } from "react";
import PostCard from "./PostCard";
import { usePostContext } from "../contexts/PostContext";

const YourPosts = () => {
  const {
    yourPostArray,
    setYourPostArray,
    yourPostIds,
    setYourPostIds,
    yourPostPage,
    setYourPostPage,
    fetchPostDetails,
    handleScroll,
    fetchPostIds,
    postPerPage,
  } = usePostContext();
  const divRef = useRef(null);
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const [componentDidMount, setComponentDidMount] = useState(true);

  useEffect(() => {
    const currentDivRef = divRef.current;

    if (currentDivRef) {
      const scrollHandler = () =>
        handleScroll(divRef, prevScrollTop, setPrevScrollTop, setYourPostPage);
      currentDivRef.addEventListener("scroll", scrollHandler);

      return () => {
        currentDivRef.removeEventListener("scroll", scrollHandler);
      };
    }
  }, []);

  useEffect(() => {
    setYourPostArray([]);
    setYourPostPage(0);

    return () => {
      setYourPostPage(0);
      setYourPostArray([]);
    };
  }, []);

  useEffect(() => {
    if (!componentDidMount) {
      fetchPostDetails(
        yourPostIds,
        yourPostPage,
        setYourPostArray,
        postPerPage
      );
    } else {
      setComponentDidMount(false);
    }
  }, [yourPostPage, yourPostIds]);

  useEffect(() => {
    fetchPostIds(
      `${import.meta.env.VITE_SERVER_URL}/post/getYourPostIDs`,
      setYourPostIds
    );
  }, []);

  return (
    <div className="postContainer" ref={divRef}>
      {yourPostArray.map(
        (post) =>
          post && <PostCard key={post._id} post={post} shareFlag={false} />
      )}
    </div>
  );
};
export default YourPosts;
