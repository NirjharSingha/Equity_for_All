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
    groupPostArray,
    setGroupPostArray,
    groupPostIds,
    setGroupPostIds,
    groupPostPage,
    setGroupPostPage,
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
        handleScroll(divRef, prevScrollTop, setPrevScrollTop, setGroupPostPage);
      };
      currentDivRef.addEventListener("scroll", scrollHandler);

      return () => {
        currentDivRef.removeEventListener("scroll", scrollHandler);
      };
    }
  }, []);

  useEffect(() => {
    setGroupPostArray([]);
    if (divRef.current) {
      divRef.current.scrollTop = 0;
    }
    fetchPostIds(
      `${import.meta.env.VITE_SERVER_URL}/post/getYourPostIDs`,
      setGroupPostIds,
      setShowLoading,
      setIsValidJWT
    );
    setGroupPostPage(0);
  }, [selectedGroup]);

  useEffect(() => {
    return () => {
      setGroupPostArray([]);
      setGroupPostIds([]);
      setGroupPostPage(0);
    };
  }, []);

  useEffect(() => {
    fetchPostDetails(
      groupPostIds,
      0,
      setGroupPostArray,
      postPerPage,
      setShowLoading,
      setIsValidJWT
    );
  }, [groupPostIds]);

  useEffect(() => {
    if (groupPostPage !== 0) {
      fetchPostDetails(
        groupPostIds,
        groupPostPage,
        setGroupPostArray,
        postPerPage,
        setShowLoading,
        setIsValidJWT
      );
    }
  }, [groupPostPage]);

  return (
    <div>
      {showAlert && (
        <AlertMessage alertMessage={alertMessage} setState={setShowAlert} />
      )}
      {access !== 0 &&
        groupPostArray.map(
          (post) =>
            post && <PostCard key={post._id} post={post} shareFlag={false} />
        )}
      {showLoading && <Loading />}
    </div>
  );
};
export default GroupPosts;
