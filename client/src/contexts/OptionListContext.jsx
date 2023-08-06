import React, { createContext, useContext } from "react";
import jwtDecode from "jwt-decode";

const OptionListContext = createContext();

export function useOptionListContext() {
  return useContext(OptionListContext);
}

const OptionListContextProvider = ({ children }) => {
  const loadOptionListData = (likesData, selected, setLikesData, setTotal) => {
    const userEmail = jwtDecode(localStorage.getItem("token")).email;
    const newLikesData = { ...likesData };

    if (selected === "like" && !newLikesData.like.includes(userEmail)) {
      newLikesData.like.push(userEmail);
    } else if (selected !== "like" && newLikesData.like.includes(userEmail)) {
      newLikesData.like = newLikesData.like.filter(
        (email) => email !== userEmail
      );
    }
    if (selected === "dislike" && !newLikesData.dislike.includes(userEmail)) {
      newLikesData.dislike.push(userEmail);
    } else if (
      selected !== "dislike" &&
      newLikesData.dislike.includes(userEmail)
    ) {
      newLikesData.dislike = newLikesData.dislike.filter(
        (email) => email !== userEmail
      );
    }
    if (selected === "laugh" && !newLikesData.laugh.includes(userEmail)) {
      newLikesData.laugh.push(userEmail);
    } else if (selected !== "laugh" && newLikesData.laugh.includes(userEmail)) {
      newLikesData.laugh = newLikesData.laugh.filter(
        (email) => email !== userEmail
      );
    }
    if (selected === "angry" && !newLikesData.angry.includes(userEmail)) {
      newLikesData.angry.push(userEmail);
    } else if (selected !== "angry" && newLikesData.angry.includes(userEmail)) {
      newLikesData.angry = newLikesData.angry.filter(
        (email) => email !== userEmail
      );
    }
    if (selected === "sad" && !newLikesData.sad.includes(userEmail)) {
      newLikesData.sad.push(userEmail);
    } else if (selected !== "sad" && newLikesData.sad.includes(userEmail)) {
      newLikesData.sad = newLikesData.sad.filter(
        (email) => email !== userEmail
      );
    }
    if (selected === "love" && !newLikesData.love.includes(userEmail)) {
      newLikesData.love.push(userEmail);
    } else if (selected !== "love" && newLikesData.love.includes(userEmail)) {
      newLikesData.love = newLikesData.love.filter(
        (email) => email !== userEmail
      );
    }
    setLikesData(newLikesData);
    setTotal(
      newLikesData.like.length +
        newLikesData.dislike.length +
        newLikesData.laugh.length +
        newLikesData.sad.length +
        newLikesData.angry.length +
        newLikesData.love.length
    );
  };
  return (
    <OptionListContext.Provider value={{ loadOptionListData }}>
      {children}
    </OptionListContext.Provider>
  );
};

export default OptionListContextProvider;
