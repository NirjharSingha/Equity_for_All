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
  const [shouldFetchYourStories, setshouldFetchYourStories] = useState(true);
  const [shouldFetchOtherStories, setshouldFetchOtherStories] = useState(true);
  const [otherStories, setOtherStories] = useState([]);
  const [storyToDisplay, setStoryToDisplay] = useState({});
  const [storyKeys, setStoryKeys] = useState([]);
  const [keyIndex, setKeyIndex] = useState(0);
  const [valueIndex, setValueIndex] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [bgImgHandler, setBgImgHandler] = useState(false);

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
        shouldFetchYourStories,
        setshouldFetchYourStories,
        shouldFetchOtherStories,
        setshouldFetchOtherStories,
        otherStories,
        setOtherStories,
        storyToDisplay,
        setStoryToDisplay,
        storyKeys,
        setStoryKeys,
        keyIndex,
        setKeyIndex,
        valueIndex,
        setValueIndex,
        isEdit,
        setIsEdit,
        bgImgHandler,
        setBgImgHandler,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export default StoryContextProvider;
