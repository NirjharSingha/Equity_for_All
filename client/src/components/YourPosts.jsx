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
      setYourPostIds([]);
      setYourPostArray([]);
    };
  }, []);

  useEffect(() => {
    if (!componentDidMount) {
      fetchPostDetails(yourPostIds, yourPostPage, setYourPostArray);
    } else {
      setComponentDidMount(false);
    }
  }, [yourPostPage, yourPostIds]);

  useEffect(() => {
    fetchPostIds(`http://localhost:5000/post/getYourPostIDs`, setYourPostIds);
  }, []);

  return (
    <div className="postContainer" ref={divRef}>
      {yourPostArray.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};
export default YourPosts;
