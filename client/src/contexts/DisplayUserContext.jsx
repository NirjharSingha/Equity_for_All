import React, { createContext, useContext } from "react";

const DisplayUserContext = createContext();

export function useDisplayUserContext() {
  return useContext(DisplayUserContext);
}

const DisplayUser = ({ children }) => {
  const displayUser = async (
    email,
    getUserInfo,
    isFileExists,
    setShouldDisplayUserImg,
    setUserName,
    setUserImg
  ) => {
    try {
      if (email) {
        const userInfo = await getUserInfo(email);
        const { name, profilePic } = userInfo;
        const baseUrl = "http://localhost:5000/";
        const imgVerify = await isFileExists(
          profilePic.substring(baseUrl.length)
        );
        if (profilePic !== "" && imgVerify.data.exists) {
          setShouldDisplayUserImg(true);
        }
        setUserName(name);
        setUserImg(profilePic);
      } else {
        console.error("post.userEmail is undefined");
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
