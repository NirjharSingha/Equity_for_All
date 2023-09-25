import React, { createContext, useContext, useState, useRef } from "react";

const StoryContext = createContext();

export function useStoryContext() {
  return useContext(StoryContext);
}

const StoryContextProvider = ({ children }) => {
  const [selectedBg, setSelectedBg] = useState(0);
  const [fontStyleVar, setFontStyle] = useState("simple");
  const [fontColor, setFontColor] = useState("white");
  const [bgColors] = useState([
    "rgb(9, 181, 181)",
    "rgb(35, 67, 156)",
    "rgb(64, 246, 36)",
    "rgb(4, 112, 33)",
    "rgb(238, 90, 36)",
    "rgb(240, 229, 13)",
    "rgb(83, 26, 130)",
    "rgb(228, 61, 243)",
    "rgb(221, 89, 135)",
  ]);
  const [selectedFile, setSelectedFile] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [crossFlag, setCrossFlag] = useState(false);

  return (
    <StoryContext.Provider
      value={{
        selectedBg,
        setSelectedBg,
        fontStyleVar,
        setFontStyle,
        fontColor,
        setFontColor,
        bgColors,
        selectedFile,
        setSelectedFile,
        inputValue,
        setInputValue,
        crossFlag,
        setCrossFlag,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export default StoryContextProvider;
