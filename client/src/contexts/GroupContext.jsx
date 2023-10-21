import React, { createContext, useContext, useState } from "react";

const GroupContext = createContext();

export function useGroupContext() {
  return useContext(GroupContext);
}

const GroupContextProvider = ({ children }) => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  return (
    <GroupContext.Provider
      value={{
        showCreateGroup,
        setShowCreateGroup,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export default GroupContextProvider;
