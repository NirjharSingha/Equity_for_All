import React, { createContext, useContext, useState, useRef } from "react";

const FriendContext = createContext();

export function useFriendContext() {
  return useContext(FriendContext);
}

const FriendContextProvider = ({ children }) => {
  const [showFriendProfile, setShowFriendProfile] = useState(false);
  const friendProfileRef = useRef(null);

  return (
    <FriendContext.Provider
      value={{
        showFriendProfile,
        setShowFriendProfile,
        friendProfileRef,
      }}
    >
      {children}
    </FriendContext.Provider>
  );
};

export default FriendContextProvider;
