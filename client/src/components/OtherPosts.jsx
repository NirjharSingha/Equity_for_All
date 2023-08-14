import React from "react";
import "./Posts.css";
import { useEffect, useState, useRef } from "react";
import PostCard from "./PostCard";
import { usePostContext } from "../contexts/PostContext";

const OtherPosts = () => {
  const {
    otherPostArray,
    setOtherPostArray,
    otherPostIds,
    setOtherPostIds,
    otherPostPage,
    setOtherPostPage,
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
        handleScroll(divRef, prevScrollTop, setPrevScrollTop, setOtherPostPage);
      currentDivRef.addEventListener("scroll", scrollHandler);

      return () => {
        currentDivRef.removeEventListener("scroll", scrollHandler);
      };
    }
  }, []);

  useEffect(() => {
    setOtherPostArray([]);
    setOtherPostPage(0);

    return () => {
      setOtherPostIds([]);
      setOtherPostArray([]);
    };
  }, []);

  useEffect(() => {
    if (!componentDidMount) {
      fetchPostDetails(
        otherPostIds,
        otherPostPage,
        setOtherPostArray,
        postPerPage
      );
    } else {
      setComponentDidMount(false);
    }
  }, [otherPostPage, otherPostIds]);

  useEffect(() => {
    fetchPostIds(`http://localhost:5000/post/getOtherPostIDs`, setOtherPostIds);
  }, []);

  return (
    <div className="postContainer" ref={divRef}>
      {otherPostArray.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};
export default OtherPosts;
