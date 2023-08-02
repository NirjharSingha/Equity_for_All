import React, { createContext, useContext, useState } from "react";

const EditPostContext = createContext();

export function useEditPostContext() {
  return useContext(EditPostContext);
}

const EditPost = ({ children }) => {
  const [editPost, setEditPost] = useState(false);
  return (
    <EditPostContext.Provider value={{ editPost, setEditPost }}>
      {children}
    </EditPostContext.Provider>
  );
};

export default EditPost;
