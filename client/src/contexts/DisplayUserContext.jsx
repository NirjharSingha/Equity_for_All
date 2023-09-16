import React, { createContext, useContext } from "react";

const DisplayUserContext = createContext();

export function useDisplayUserContext() {
  return useContext(DisplayUserContext);
}

const DisplayUser = ({ children }) => {
  const displayUser = async (
    isFileExists,
    setShouldDisplayUserImg,
    profilePic
  ) => {
    try {
      if (profilePic !== "") {
        const baseUrl = `${import.meta.env.VITE_SERVER_URL}/`;
        const imgVerify = await isFileExists(
          profilePic.substring(baseUrl.length)
        );
        if (imgVerify.data.exists) {
          setShouldDisplayUserImg(true);
        }
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  return (
    <DisplayUserContext.Provider value={{ displayUser }}>
      {children}
    </DisplayUserContext.Provider>
  );
};

export default DisplayUser;
