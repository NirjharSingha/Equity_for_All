import React, { createContext, useContext } from "react";
import jwtDecode from "jwt-decode";

const LikesContext = createContext();

export function useLikesContext() {
  return useContext(LikesContext);
}

const LikesContextProvider = ({ children }) => {
  const checkInitialMount = (isInitialMount, handleLikePut) => {
    if (!isInitialMount.current) {
      handleLikePut();
    } else {
      isInitialMount.current = false;
    }
  };

  const setUserLikes = (data, setSelected, setPrevLike) => {
    const decodedToken = jwtDecode(localStorage.getItem("token"));
    const email = decodedToken.email;

    if (data.like.includes(email)) {
      setSelected("like");
      setPrevLike("like");
    } else if (data.dislike.includes(email)) {
      setSelected("dislike");
      setPrevLike("dislike");
    } else if (data.laugh.includes(email)) {
      setSelected("laugh");
      setPrevLike("laugh");
    } else if (data.love.includes(email)) {
      setSelected("love");
      setPrevLike("love");
    } else if (data.sad.includes(email)) {
      setSelected("sad");
      setPrevLike("sad");
    } else if (data.angry.includes(email)) {
      setSelected("angry");
      setPrevLike("angry");
    } else {
      setSelected("");
      setPrevLike("");
    }
  };

  return (
    <LikesContext.Provider value={{ checkInitialMount, setUserLikes }}>
      {children}
    </LikesContext.Provider>
  );
};

export default LikesContextProvider;
