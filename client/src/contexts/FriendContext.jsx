import React, { createContext, useContext, useState, useRef } from "react";

const FriendContext = createContext();

export function useFriendContext() {
  return useContext(FriendContext);
}

const FriendContextProvider = ({ children }) => {
  const friendProfileRef = useRef(null);
  const [friendsID, setFriendsID] = useState([]);
  const [blockID, setBlockID] = useState([]);
  const [reqSendID, setReqSendID] = useState([]);
  const [reqReceivedID, setReqReceivedID] = useState([]);
  const [fetchSuggessions, setFetchSuggessions] = useState(true);
  const [suggessionsID, setSuggessionsID] = useState([]);
  const [followersID, setFollowersID] = useState([]);
  const [followingsID, setFollowingsID] = useState([]);
  const [selectedOption, setSelectedOption] = useState(0);

  return (
    <FriendContext.Provider
      value={{
        friendProfileRef,
        friendsID,
        setFriendsID,
        selectedOption,
        setSelectedOption,
        reqReceivedID,
        setReqReceivedID,
        blockID,
        setBlockID,
        reqSendID,
        setReqSendID,
        fetchSuggessions,
        setFetchSuggessions,
        suggessionsID,
        setSuggessionsID,
        followersID,
        setFollowersID,
        followingsID,
        setFollowingsID,
      }}
    >
      {children}
    </FriendContext.Provider>
  );
};

export default FriendContextProvider;
