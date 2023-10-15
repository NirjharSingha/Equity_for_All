import React, { createContext, useContext, useState } from "react";

const GlobalsContext = createContext();

export function useGlobals() {
  return useContext(GlobalsContext);
}

const GlobalsProvider = ({ children }) => {
  const [isValidJWT, setIsValidJWT] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  return (
    <GlobalsContext.Provider
      value={{
        isValidJWT,
        setIsValidJWT,
        windowWidth,
        setWindowWidth,
      }}
    >
      {children}
    </GlobalsContext.Provider>
  );
};

export default GlobalsProvider;
