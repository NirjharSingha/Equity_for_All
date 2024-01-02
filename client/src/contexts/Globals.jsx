import React, { createContext, useContext, useState } from "react";
import { useRef } from "react";

const GlobalsContext = createContext();

export function useGlobals() {
  return useContext(GlobalsContext);
}

const GlobalsProvider = ({ children }) => {
  const [isValidJWT, setIsValidJWT] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unseenNotificationCount, setUnseenNotificationCount] = useState(0);
  const navNotificationRef = useRef(null);

  return (
    <GlobalsContext.Provider
      value={{
        isValidJWT,
        setIsValidJWT,
        windowWidth,
        setWindowWidth,
        showNotifications,
        setShowNotifications,
        navNotificationRef,
        unseenNotificationCount,
        setUnseenNotificationCount,
      }}
    >
      {children}
    </GlobalsContext.Provider>
  );
};

export default GlobalsProvider;
