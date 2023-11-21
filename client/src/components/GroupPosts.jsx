import React from "react";
import "./Posts.css";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { usePostContext } from "../contexts/PostContext";
import AlertMessage from "./AlertMessage";
import Loading from "./Loading";
import { useGlobals } from "../contexts/Globals";
import { useGroupContext } from "../contexts/GroupContext";

const GroupPosts = () => {
  const { setIsValidJWT } = useGlobals();
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
    showAlert,
    setShowAlert,
    alertMessage,
  } = usePostContext();
  const { divRef, selectedGroup, access } = useGroupContext();
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const currentDivRef = divRef.current;

    if (currentDivRef) {
      const scrollHandler = () => {
        handleScroll(divRef, prevScrollTop, setPrevScrollTop, setYourPostPage);
      };
      currentDivRef.addEventListener("scroll", scrollHandler);

      return () => {
        currentDivRef.removeEventListener("scroll", scrollHandler);
      };
    }
  }, []);

  useEffect(() => {
    setYourPostArray([]);
    if (divRef.current) {
      divRef.current.scrollTop = 0;
    }
    fetchPostIds(
      `${import.meta.env.VITE_SERVER_URL}/post/getGroupPostIDs/${
        selectedGroup._id
      }`,
      setYourPostIds,
      setShowLoading,
      setIsValidJWT
    );
    setYourPostPage(0);
  }, [selectedGroup]);

  useEffect(() => {
    return () => {
      setYourPostArray([]);
      setYourPostIds([]);
      setYourPostPage(0);
    };
  }, []);

  useEffect(() => {
    fetchPostDetails(
      yourPostIds,
      0,
      setYourPostArray,
      postPerPage,
      setShowLoading,
      setIsValidJWT
    );
  }, [yourPostIds]);

  useEffect(() => {
    if (yourPostPage !== 0) {
      fetchPostDetails(
        yourPostIds,
        yourPostPage,
        setYourPostArray,
        postPerPage,
        setShowLoading,
        setIsValidJWT
      );
    }
  }, [yourPostPage]);

  return (
    <div>
      {showAlert && (
        <AlertMessage alertMessage={alertMessage} setState={setShowAlert} />
      )}
      {access !== 0 &&
        yourPostArray.map(
          (post) =>
            post && <PostCard key={post._id} post={post} shareFlag={false} />
        )}
      {showLoading && <Loading />}
    </div>
  );
};
export default GroupPosts;
