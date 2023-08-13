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

  const fetchPostDetails = async (postIds, postPage, setPostArray) => {
    let arrayToSend = [];
    if (postIds.length > 0 && postPage * 8 <= postIds.length) {
      console.log(postPage);
      for (
        let index = postPage * 8;
        index < postIds.length && index < postPage * 8 + 8;
        index++
      ) {
        const element = postIds[index];
        arrayToSend.push(element);
      }
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/post/all?ids=${arrayToSend}`,
          {
            headers: {
              token: token,
            },
          }
        );
        const posts = response.data;
        setPostArray((prev) => [...prev, ...posts]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
  };

  const fetchPostIds = async (path, setPostIds) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(path, {
        headers: {
          token: token,
        },
      });
      if (response) {
        const data = response.data;
        setPostIds([...data]);
      }
    } catch (error) {
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
        fetchPostDetails,
        fetchPostIds,
        handleScroll,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
