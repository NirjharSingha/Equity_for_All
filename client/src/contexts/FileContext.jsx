import React, { createContext, useContext } from "react";
import axios from "axios";

const FileContext = createContext();

export function useFileContext() {
  return useContext(FileContext);
}

const FileContextProvider = ({ children }) => {
  const deleteFile = async (fileUrl) => {
    let dataToSend = [];
    for (let index = 0; index < fileUrl.length; index++) {
      const element = fileUrl[index];
      const baseUrl = `${import.meta.env.VITE_SERVER_URL}/`;
      const url = element.substring(baseUrl.length);
      dataToSend.push(url);
    }
    console.log(dataToSend);
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/api/deleteFile?fileUrl=${dataToSend}`
    );
    return response;
  };

  return (
    <FileContext.Provider value={{ deleteFile }}>
      {children}
    </FileContext.Provider>
  );
};

export default FileContextProvider;
