import React, { createContext, useContext, useState } from "react";

const GroupContext = createContext();

export function useGroupContext() {
  return useContext(GroupContext);
}

const GroupContextProvider = ({ children }) => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [isGroupPost, setIsGroupPost] = useState(false);
  const [groupsYouCreated, setGroupsYouCreated] = useState([]);
  const [groupsYouJoined, setGroupsYouJoined] = useState([]);
  const [reqSent, setReqSent] = useState([]);
  const [invitationReceived, setInvitationReceived] = useState([]);
  const [suggestedGroups, setSuggestGroups] = useState([]);
  const [fetchGroup, setFetchGroup] = useState(false);

  return (
    <GroupContext.Provider
      value={{
        showCreateGroup,
        setShowCreateGroup,
        isGroupPost,
        setIsGroupPost,
        groupsYouCreated,
        setGroupsYouCreated,
        groupsYouJoined,
        setGroupsYouJoined,
        reqSent,
        setReqSent,
        invitationReceived,
        setInvitationReceived,
        fetchGroup,
        setFetchGroup,
        suggestedGroups,
        setSuggestGroups,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export default GroupContextProvider;
