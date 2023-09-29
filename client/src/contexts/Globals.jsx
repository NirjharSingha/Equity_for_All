import React, { createContext, useContext, useState } from "react";

const GlobalsContext = createContext();

export function useGlobals() {
  return useContext(GlobalsContext);
}

const GlobalsProvider = ({ children }) => {
  const [isValidJWT, setIsValidJWT] = useState(true);

  return (
    <GlobalsContext.Provider
      value={{
        isValidJWT,
        setIsValidJWT,
      }}
    >
      {children}
    </GlobalsContext.Provider>
  );
};

export default GlobalsProvider;
