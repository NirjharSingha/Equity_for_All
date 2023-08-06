import React, { createContext, useContext, useState } from "react";

const PostContext = createContext();

export function usePostContext() {
  return useContext(PostContext);
}

const PostContextProvider = ({ children }) => {
  const [editPost, setEditPost] = useState(false);
  const [postArray, setPostArray] = useState([]);
  const [selectedPost, setSelectedPost] = useState();
  const [showOptionList, setShowOptionList] = useState(false);
  return (
    <PostContext.Provider
      value={{
        editPost,
        setEditPost,
        postArray,
        setPostArray,
        selectedPost,
        setSelectedPost,
        showOptionList,
        setShowOptionList,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
