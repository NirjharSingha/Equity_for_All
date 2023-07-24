import React, { createContext, useContext } from "react";
import axios from "axios";

const VerifyFileContext = createContext();

export function useVerifyFileContext() {
  return useContext(VerifyFileContext);
}

const VerifyFile = ({ children }) => {
  const isFileExists = async (fileUrl) => {
    const response = await axios.get(
      `http://localhost:5000/api/files/check?fileUrl=${encodeURIComponent(
        fileUrl
      )}`
    );
    return response;
  };

  return (
    <VerifyFileContext.Provider value={{ isFileExists }}>
      {children}
    </VerifyFileContext.Provider>
  );
};

export default VerifyFile;
