import React, { createContext, useContext } from "react";
import axios from "axios";

const FileContext = createContext();

export function useFileContext() {
  return useContext(FileContext);
}

const FileContextProvider = ({ children }) => {
  const isFileExists = async (fileUrl) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/files/check?fileUrl=${encodeURIComponent(fileUrl)}`
    );
    return response;
  };

  return (
    <FileContext.Provider value={{ isFileExists }}>
      {children}
    </FileContext.Provider>
  );
};

export default FileContextProvider;
