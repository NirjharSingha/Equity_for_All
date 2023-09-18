import React from "react";
import "./Posts.css";
import { useEffect, useState, useRef } from "react";
import PostCard from "./PostCard";
import { usePostContext } from "../contexts/PostContext";
import Loading from "./Loading";

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
    shouldFetchOtherPostIds,
    setShouldFetchOtherPostIds,
  } = usePostContext();
  const divRef = useRef(null);
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const [componentDidMount, setComponentDidMount] = useState(true);
  const [showLoading, setShowLoading] = useState(true);

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
    fetchPostDetails(
      otherPostIds,
      otherPostPage,
      setOtherPostArray,
      postPerPage,
      setShowLoading
    );

    return () => {
      setOtherPostPage(0);
      setOtherPostArray([]);
    };
  }, []);

  useEffect(() => {
    if (!componentDidMount) {
      fetchPostDetails(
        otherPostIds,
        otherPostPage,
        setOtherPostArray,
        postPerPage,
        setShowLoading
      );
    } else {
      setComponentDidMount(false);
    }
  }, [otherPostPage, otherPostIds]);

  useEffect(() => {
    if (shouldFetchOtherPostIds) {
      fetchPostIds(
        `${import.meta.env.VITE_SERVER_URL}/post/getOtherPostIDs`,
        setOtherPostIds,
        setShowLoading
      );
      setShouldFetchOtherPostIds(false);
    }
  }, []);

  return (
    <div className="postContainer" ref={divRef}>
      {otherPostArray.map((post) => (
        <PostCard key={post._id} post={post} shareFlag={false} />
      ))}
      {showLoading && <Loading />}
    </div>
  );
};
export default OtherPosts;
