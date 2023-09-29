import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const PostContext = createContext();

export function usePostContext() {
  return useContext(PostContext);
}

const PostContextProvider = ({ children }) => {
  const [editPost, setEditPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState();
  const [showYourPost, setShowYourPost] = useState(false);
  const [otherPostArray, setOtherPostArray] = useState([]);
  const [otherPostPage, setOtherPostPage] = useState(0);
  const [otherPostIds, setOtherPostIds] = useState([]);
  const [yourPostArray, setYourPostArray] = useState([]);
  const [yourPostPage, setYourPostPage] = useState(0);
  const [yourPostIds, setYourPostIds] = useState([]);
  const [postPerPage] = useState(8);
  const [shouldFetchOtherPostIds, setShouldFetchOtherPostIds] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const fetchPostDetails = async (
    postIds,
    postPage,
    setPostArray,
    postPerPage,
    setShowLoading,
    setIsValidJWT
  ) => {
    let arrayToSend = [];
    if (postIds.length > 0 && postPage * postPerPage <= postIds.length) {
      console.log(postPage);
      for (
        let index = postPage * postPerPage;
        index < postIds.length && index < postPage * postPerPage + postPerPage;
        index++
      ) {
        const element = postIds[index];
        arrayToSend.push(element);
      }
      try {
        setShowLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/post/all?ids=${arrayToSend}`,
          {
            headers: {
              token: token,
            },
          }
        );
        if (response) {
          const posts = response.data;
          setPostArray((prev) => [...prev, ...posts]);
          setShowLoading(false);
        }
      } catch (error) {
        if (
          error.response.status === 401 &&
          error.response.statusText === "Unauthorized"
        ) {
          console.log("inside status code");
          setIsValidJWT(false);
        }
        console.error("Error fetching posts:", error);
      }
    }
  };

  const fetchPostIds = async (
    path,
    setPostIds,
    setShowLoading,
    setIsValidJWT
  ) => {
    try {
      setShowLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(path, {
        headers: {
          token: token,
        },
      });
      if (response) {
        const data = response.data;
        setPostIds([...data]);
        setShowLoading(false);
      }
    } catch (error) {
      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        console.log("inside status code");
        setIsValidJWT(false);
      }
      console.error("Error fetching posts:", error);
    }
  };

  const handleScroll = (
    divRef,
    prevScrollTop,
    setPrevScrollTop,
    setPostPage
  ) => {
    const currentScrollTop = divRef.current.scrollTop;
    if (currentScrollTop > prevScrollTop) {
      if (
        divRef.current.scrollHeight -
          divRef.current.scrollTop -
          divRef.current.clientHeight <
        1
      ) {
        setPostPage((prev) => prev + 1);
      }
    }
    setPrevScrollTop(currentScrollTop);
  };

  return (
    <PostContext.Provider
      value={{
        editPost,
        setEditPost,
        otherPostArray,
        setOtherPostArray,
        selectedPost,
        setSelectedPost,
        showYourPost,
        setShowYourPost,
        otherPostPage,
        setOtherPostPage,
        otherPostIds,
        setOtherPostIds,
        yourPostArray,
        setYourPostArray,
        yourPostPage,
        setYourPostPage,
        yourPostIds,
        setYourPostIds,
        postPerPage,
        fetchPostDetails,
        fetchPostIds,
        handleScroll,
        shouldFetchOtherPostIds,
        setShouldFetchOtherPostIds,
        showAlert,
        setShowAlert,
        alertMessage,
        setAlertMessage,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
