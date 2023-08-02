import React, { createContext, useContext, useState } from "react";

const DisplayPostContext = createContext();

export function useDisplayPostContext() {
  return useContext(DisplayPostContext);
}

const DisplayPost = ({ children }) => {
  const [postArray, setPostArray] = useState([]);
  return (
    <DisplayPostContext.Provider value={{ postArray, setPostArray }}>
      {children}
    </DisplayPostContext.Provider>
  );
};

export default DisplayPost;
