import React, { createContext, useContext, useState } from "react";

const PostContext = createContext();

export function usePostContext() {
  return useContext(PostContext);
}

const PostContextProvider = ({ children }) => {
  const [editPost, setEditPost] = useState(false);
  const [postArray, setPostArray] = useState([]);
  const [selectedPost, setSelectedPost] = useState();
  const [showYourPost, setShowYourPost] = useState(false);
  const [postInfiniteScrollIndex, setPostInfiniteScrollIndex] = useState(0);
  const [postIds, setPostIds] = useState([]);
  return (
    <PostContext.Provider
      value={{
        editPost,
        setEditPost,
        postArray,
        setPostArray,
        selectedPost,
        setSelectedPost,
        showYourPost,
        setShowYourPost,
        postInfiniteScrollIndex,
        setPostInfiniteScrollIndex,
        postIds,
        setPostIds,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
