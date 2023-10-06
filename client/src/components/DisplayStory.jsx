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
      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        console.log("inside status code");
        setIsValidJWT(false);
      }
    }
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
              <div className="editStoryContainer" ref={editContainerRef}>
                <div
                  className="editOrDelete"
                  onClick={() => {
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
                  }}
                >
                  Edit Story
                </div>
                <div
                  className="editOrDelete"
                  onClick={() => {
                    setShowConfirm(true);
                    setShowEdit(false);
                  }}
                >
                  Delete Story
                </div>
              </div>
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
                  <svg
                    id="logo-15"
                    viewBox="0 0 49 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="storyCreatorPic"
                  >
                    {" "}
                    <path
                      d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z"
                      className="ccustom"
                      fill="#17CF97"
                    ></path>{" "}
                    <path
                      d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z"
                      className="ccustom"
                      fill="#17CF97"
                    ></path>{" "}
                    <path
                      d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z"
                      className="ccustom"
                      fill="#17CF97"
                    ></path>{" "}
                    <path
                      d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z"
                      className="ccustom"
                      fill="#17CF97"
                    ></path>{" "}
                  </svg>
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
