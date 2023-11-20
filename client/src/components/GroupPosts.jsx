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
  const { divRef } = useGroupContext();
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const [componentDidMount, setComponentDidMount] = useState(true);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const currentDivRef = divRef.current;

    if (currentDivRef) {
      const scrollHandler = () =>
        handleScroll(divRef, prevScrollTop, setPrevScrollTop, setGroupPostPage);
      currentDivRef.addEventListener("scroll", scrollHandler);

      return () => {
        currentDivRef.removeEventListener("scroll", scrollHandler);
      };
    }
  }, []);

  useEffect(() => {
    setGroupPostArray([]);
    setGroupPostPage(0);

    return () => {
      setGroupPostPage(0);
      setGroupPostArray([]);
    };
  }, []);

  useEffect(() => {
    if (!componentDidMount) {
      fetchPostDetails(
        groupPostIds,
        groupPostPage,
        setGroupPostArray,
        postPerPage,
        setShowLoading,
        setIsValidJWT
      );
    } else {
      setComponentDidMount(false);
    }
  }, [groupPostPage, groupPostIds]);

  useEffect(() => {
    fetchPostIds(
      `${import.meta.env.VITE_SERVER_URL}/post/getYourPostIDs`,
      setGroupPostIds,
      setShowLoading,
      setIsValidJWT
    );
  }, []);

  return (
    <div>
      {showAlert && (
        <AlertMessage alertMessage={alertMessage} setState={setShowAlert} />
      )}
      {groupPostArray.map(
        (post) =>
          post && <PostCard key={post._id} post={post} shareFlag={false} />
      )}
      {showLoading && <Loading />}
    </div>
  );
};
export default GroupPosts;