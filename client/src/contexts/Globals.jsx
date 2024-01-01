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
      }}
    >
      {children}
    </GlobalsContext.Provider>
  );
};

export default GlobalsProvider;
