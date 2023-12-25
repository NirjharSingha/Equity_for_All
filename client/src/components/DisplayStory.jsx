import React, { useRef } from "react";
import "./DisplayStory.css";
import { FaPause } from "react-icons/fa6";
import { BsTriangleFill } from "react-icons/bs";
import { useStoryContext } from "../contexts/StoryContext";
import { FaLessThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import ConfirmWindow from "./ConfirmWindow";
import axios from "axios";
import { useFileContext } from "../contexts/FileContext";
import { useGlobals } from "../contexts/Globals";
import EditSideBar from "./EditSideBar";

const DisplayStory = () => {
  const {
    storyToDisplay,
    otherStories,
    storyKeys,
    setStoryToDisplay,
    keyIndex,
    setKeyIndex,
    valueIndex,
    setValueIndex,
    setIsEdit,
    setSelectedBg,
    setFontStyle,
    setFontColor,
    bgColors,
    setInputValue,
    setCrossFlag,
    setBgImgHandler,
    setOtherStories,
    setStoryKeys,
  } = useStoryContext();
  const { setIsValidJWT } = useGlobals();
  const navigate = useNavigate();
  const editContainerRef = useRef(null);
  const { getUserInfo } = useUserInfoContext();
  const [userName, setUserName] = useState("User Name");
  const [userImg, setUserImg] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [filled, setFilled] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const { deleteFile } = useFileContext();
  useEffect(() => {
    let timeoutId;
    if (filled < 100 && isRunning) {
      timeoutId = setTimeout(() => setFilled((prev) => (prev += 2)), 100);
    }
    if (filled >= 100) {
      handleStoryChange(1);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [filled, isRunning]);
  useEffect(() => {
    setFilled(0);
  }, [storyToDisplay]);

  let paragraphs;
  if (storyToDisplay && storyToDisplay.storyDescription !== undefined) {
    paragraphs = storyToDisplay.storyDescription
      .split("\n")
      .map((paragraph, index) => (
        <React.Fragment key={index}>
          <p>{paragraph}</p>
        </React.Fragment>
      ));
  }
  useEffect(() => {
    if (storyToDisplay && Object.keys(storyToDisplay).length === 0) {
      navigate("/main");
    }
  }, [storyToDisplay, keyIndex]);

  const handleStoryChange = (flag) => {
    if (Object.keys(storyToDisplay).length !== 0) {
      let currentKeyIndex = storyKeys.indexOf(storyToDisplay.userEmail);
      let userStoriesArray = otherStories[storyToDisplay.userEmail] || [];
      let currentStoryIndex = userStoriesArray.findIndex(
        (story) => story._id === storyToDisplay._id
      );

      if (flag === 1) {
        if (currentStoryIndex === userStoriesArray.length - 1) {
          currentKeyIndex = (currentKeyIndex + 1) % storyKeys.length;
          setStoryToDisplay(otherStories[storyKeys[currentKeyIndex]][0]);
          setValueIndex(0);
        } else {
          setStoryToDisplay(
            otherStories[storyKeys[currentKeyIndex]][currentStoryIndex + 1]
          );
          setValueIndex(currentStoryIndex + 1);
        }
      } else {
        if (currentStoryIndex === 0) {
          currentKeyIndex =
            (currentKeyIndex - 1 + storyKeys.length) % storyKeys.length;
          const lengthOfArray = otherStories[storyKeys[currentKeyIndex]].length;
          setStoryToDisplay(
            otherStories[storyKeys[currentKeyIndex]][lengthOfArray - 1]
          );
          setValueIndex(lengthOfArray - 1);
        } else {
          setStoryToDisplay(
            otherStories[storyKeys[currentKeyIndex]][currentStoryIndex - 1]
          );
          setValueIndex(currentStoryIndex - 1);
        }
      }
      setKeyIndex(currentKeyIndex);
    }
  };
  useEffect(() => {
    console.log(storyToDisplay);
    const handleOutsideClick = (event) => {
      if (
        editContainerRef.current &&
        !editContainerRef.current.contains(event.target)
      ) {
        setShowEdit(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  useEffect(() => {
    const displayStoryUser = async () => {
      if (storyToDisplay.userEmail !== undefined) {
        const { name, profilePic } = await getUserInfo(
          storyToDisplay.userEmail
        );
        setUserName(name), setUserImg(profilePic);
      }
    };
    console.log(storyKeys.length);
    console.log(otherStories);

    displayStoryUser();
  }, [storyToDisplay]);

  const handleDeleteStory = async () => {
    const token = localStorage.getItem("token");
    const email = jwtDecode(token).email;
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/story/deleteStory/${
          storyToDisplay._id
        }`,
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.status == 200) {
        console.log("inside Status");
        if (storyToDisplay.backgroundImage !== "") {
          console.log("inside bg");
          deleteFile([storyToDisplay.backgroundImage]);
        }
        console.log("story deleted successfully");
        if (otherStories[email].length > 1) {
          setOtherStories((prev) => {
            const updatedArray = [...prev[email]];
            const indexOfStoryToDelete = updatedArray.findIndex(
              (story) => story._id === storyToDisplay._id
            );
            if (indexOfStoryToDelete !== -1) {
              updatedArray.splice(indexOfStoryToDelete, 1);
            }
            return {
              ...prev,
              [email]: updatedArray,
            };
          });
        } else {
          console.log(email);
          setOtherStories((prevState) => {
            const newState = { ...prevState };
            delete newState[email];
            console.log("other stories");
            console.log(newState);
            return newState;
          });
          setStoryKeys((prevState) => {
            const newArray = prevState.filter((element) => element !== email);
            console.log("story Keys");
            console.log(newArray);
            return newArray;
          });
        }
        navigate("/main");
      }
    } catch (error) {
      console.log("inside error block");
      if (error.response.status === 401) {
        console.log("inside status code");
        setIsValidJWT(false);
      }
    }
  };

  const handleEdit = () => {
    setIsEdit(true);
    setInputValue(storyToDisplay.storyDescription);
    setFontStyle(storyToDisplay.fontStyle);
    setFontColor(storyToDisplay.fontColor);
    setSelectedBg(() =>
      bgColors.findIndex(
        (element) => element === storyToDisplay.backgroundColor
      )
    );
    if (storyToDisplay.backgroundImage !== "") {
      setCrossFlag(true);
      setBgImgHandler(true);
    }
    navigate("/main/createStory");
  };

  const handleDelete = () => {
    setShowConfirm(true);
    setShowEdit(false);
  };

  return (
    <>
      {showConfirm && (
        <ConfirmWindow
          handleAction={handleDeleteStory}
          setShowConfirm={setShowConfirm}
          flag="story"
          isConfirmWindow={true}
        />
      )}
      {storyToDisplay && (
        <div className="displayStoryContainer">
          {storyKeys.length > 0 &&
            (storyKeys.length > 1 || otherStories[storyKeys[0]].length > 1) && (
              <div
                className="storyArrawButton"
                onClick={() => {
                  handleStoryChange(-1);
                  setIsRunning(true);
                }}
              >
                <FaLessThan className="storyArraw" />
              </div>
            )}
          <div className="displayStory">
            {showEdit && (
              <EditSideBar
                containerClass="editStoryContainer"
                containerRef={editContainerRef}
                handler_1={handleEdit}
                handler_2={handleDelete}
              />
            )}
            <div
              className="progressBar"
              style={
                storyKeys[keyIndex] !== undefined &&
                otherStories[storyKeys[keyIndex]] !== undefined
                  ? {
                      gridTemplateColumns: `repeat(${
                        otherStories[storyKeys[keyIndex]].length
                      },1fr)`,
                    }
                  : {}
              }
            >
              {storyKeys[keyIndex] !== undefined &&
                otherStories[storyKeys[keyIndex]] !== undefined &&
                otherStories[storyKeys[keyIndex]].map((_, index) => (
                  <div
                    className="progressItem"
                    key={index}
                    style={
                      index < valueIndex
                        ? { backgroundColor: "#F3F3F3" }
                        : index === valueIndex
                        ? { width: `${filled}%`, backgroundColor: "#F3F3F3" }
                        : { backgroundColor: "#808080" }
                    }
                  ></div>
                ))}
            </div>
            <div className="storyCreator">
              <div className="storyCreatorPicContainer">
                {userImg !== "" && (
                  <img src={userImg} alt="" className="storyCreatorPic" />
                )}
                {userImg === "" && (
                  <img
                    src="/profilePicIcon.svg" // Use the path to the SVG in the public folder
                    alt=""
                    className="storyCreatorPic"
                  />
                )}
              </div>
              <div className="storyCreatorNameContainer">
                <p className="storyCreatorName">
                  {storyToDisplay.userEmail ===
                  jwtDecode(localStorage.getItem("token")).email
                    ? "Your story"
                    : userName}
                </p>
                <p className="storyTime">
                  {new Date(storyToDisplay.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <div className="displayStoryIcons">
                {storyToDisplay.userEmail ===
                  jwtDecode(localStorage.getItem("token")).email && (
                  <p
                    onClick={() => {
                      setShowEdit(true);
                      setIsRunning(false);
                    }}
                  >
                    ...
                  </p>
                )}
                {isRunning && (
                  <FaPause
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={() => setIsRunning(false)}
                  />
                )}
                {!isRunning && (
                  <BsTriangleFill
                    style={{
                      color: "white",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                      rotate: "90deg",
                    }}
                    onClick={() => setIsRunning(true)}
                  />
                )}
              </div>
            </div>
            <div
              className="storyContent"
              style={
                storyToDisplay.backgroundImage === ""
                  ? {
                      backgroundColor: storyToDisplay.backgroundColor,
                    }
                  : {
                      backgroundImage: `url(${storyToDisplay.backgroundImage})`,
                      backgroundColor: "rgb(41, 40, 40)",
                      border: `2px solid rgb(41, 40, 40)`,
                    }
              }
            >
              <span
                className="storySpan"
                style={{
                  fontStyle:
                    storyToDisplay.fontStyle === "fancy" ? "italic" : "normal",
                  color: storyToDisplay.fontColor,
                }}
              >
                {paragraphs}
              </span>
            </div>
          </div>
          {storyKeys.length > 0 &&
            (storyKeys.length > 1 || otherStories[storyKeys[0]].length > 1) && (
              <div
                className="storyArrawButton"
                onClick={() => {
                  handleStoryChange(1);
                  setIsRunning(true);
                }}
              >
                <FaGreaterThan className="storyArraw" />
              </div>
            )}
        </div>
      )}
    </>
  );
};

export default DisplayStory;
