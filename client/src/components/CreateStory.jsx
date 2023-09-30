import React from "react";
import "./CreateStory.css";
import { useEffect } from "react";
import "./CreatePost.css";
import { useState, useRef } from "react";
import axios from "axios";
import { useStoryContext } from "../contexts/StoryContext";
import { useGlobals } from "../contexts/Globals";
import { useNavigate } from "react-router-dom";

const CreateStory = () => {
  const navigate = useNavigate();
  const { setIsValidJWT } = useGlobals();
  useEffect(() => {
    console.log("create story component loaded");
  }, []);

  const fileInputRef = useRef(null);
  const [isDisable, setIsDisable] = useState(true);
  const [visibility, setVisibility] = useState("Anyone");
  const {
    selectedBg,
    setSelectedBg,
    fontStyleVar,
    setFontStyle,
    fontColor,
    setFontColor,
    selectedFile,
    setSelectedFile,
    inputValue,
    setInputValue,
    crossFlag,
    setCrossFlag,
    bgColors,
  } = useStoryContext();

  const resetValues = () => {
    setSelectedBg(0);
    setFontStyle("simple");
    setFontColor("white");
    setSelectedFile({});
    setInputValue("");
    setCrossFlag(false);
  };

  useEffect(() => {
    resetValues();
  }, []);

  const handleFileUpload = () => {
    if (!crossFlag) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setCrossFlag(true);
  };

  useEffect(() => {
    if (inputValue === "" && crossFlag === false) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [inputValue, crossFlag]);

  const handleCreateStory = async (e) => {
    e.preventDefault();
    const storyData = new FormData();
    storyData.append("storyDescription", inputValue);
    storyData.append("storyVisibility", visibility);
    storyData.append("createdAt", new Date(Date.now()).toLocaleString());
    storyData.append("backgroundImage", selectedFile);
    storyData.append("backgroundColor", bgColors[selectedBg]);
    storyData.append("fontStyle", fontStyleVar);
    storyData.append("fontColor", fontColor);

    try {
      const token = localStorage.getItem("token");
      let response;
      response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/story/createStory`,
        storyData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );
      if (response.status === 201) {
        console.log("story created successfully");
        resetValues();
        navigate("/main");
      }
    } catch (error) {
      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        console.log("inside status code");
        setIsValidJWT(false);
      }
      console.log(error);
    }
  };

  return (
    <form
      className="createPost"
      onSubmit={handleCreateStory}
      encType="multipart/form-data"
    >
      <div className="createPostFirstRow">
        <div>
          <textarea
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
            placeholder="Start writing"
            className="storyDescription"
          />
        </div>
        <select
          id="fontStyle"
          name="fontStyle"
          className="storyFont"
          value={fontStyleVar}
          onChange={(e) => setFontStyle(e.target.value)}
        >
          <option value="simple" className="storyVisibilityOption">
            Simple text
          </option>
          <option value="fancy" className="storyVisibilityOption">
            Fancy
          </option>
        </select>
        <select
          id="fontColor"
          name="fontColor"
          className="storyFont"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
        >
          <option value="white" className="storyVisibilityOption">
            Text color white
          </option>
          <option value="black" className="storyVisibilityOption">
            Text color black
          </option>
          <option value="blue" className="storyVisibilityOption">
            Text color blue
          </option>
          <option value="red" className="storyVisibilityOption">
            Text color red
          </option>
          <option value="green" className="storyVisibilityOption">
            Text color green
          </option>
        </select>
        <div className="storyBackground">
          <p className="storyHeadings">Background</p>
          <div className="bgColorChoice">
            <div
              className="color color_1"
              style={
                selectedBg === 0
                  ? {
                      minWidth: "2.2rem",
                      minHeight: "2.2rem",
                      border: "3px solid rgb(111, 108, 108)",
                    }
                  : {}
              }
              onClick={() => setSelectedBg(0)}
            ></div>
            <div
              className="color color_2"
              style={
                selectedBg === 1
                  ? {
                      minWidth: "2.2rem",
                      minHeight: "2.2rem",
                      border: "3px solid rgb(111, 108, 108)",
                    }
                  : {}
              }
              onClick={() => setSelectedBg(1)}
            ></div>
            <div
              className="color color_3"
              style={
                selectedBg === 2
                  ? {
                      minWidth: "2.2rem",
                      minHeight: "2.2rem",
                      border: "3px solid rgb(111, 108, 108)",
                    }
                  : {}
              }
              onClick={() => setSelectedBg(2)}
            ></div>
            <div
              className="color color_4"
              style={
                selectedBg === 3
                  ? {
                      minWidth: "2.2rem",
                      minHeight: "2.2rem",
                      border: "3px solid rgb(111, 108, 108)",
                    }
                  : {}
              }
              onClick={() => setSelectedBg(3)}
            ></div>
            <div
              className="color color_5"
              style={
                selectedBg === 4
                  ? {
                      minWidth: "2.2rem",
                      minHeight: "2.2rem",
                      border: "3px solid rgb(111, 108, 108)",
                    }
                  : {}
              }
              onClick={() => setSelectedBg(4)}
            ></div>
            <div
              className="color color_6"
              style={
                selectedBg === 5
                  ? {
                      minWidth: "2.2rem",
                      minHeight: "2.2rem",
                      border: "3px solid rgb(111, 108, 108)",
                    }
                  : {}
              }
              onClick={() => setSelectedBg(5)}
            ></div>
            <div
              className="color color_7"
              style={
                selectedBg === 6
                  ? {
                      minWidth: "2.2rem",
                      minHeight: "2.2rem",
                      border: "3px solid rgb(111, 108, 108)",
                    }
                  : {}
              }
              onClick={() => setSelectedBg(6)}
            ></div>
            <div
              className="color color_8"
              style={
                selectedBg === 7
                  ? {
                      minWidth: "2.2rem",
                      minHeight: "2.2rem",
                      border: "3px solid rgb(111, 108, 108)",
                    }
                  : {}
              }
              onClick={() => setSelectedBg(7)}
            ></div>
            <div
              className="color color_9"
              style={
                selectedBg === 8
                  ? {
                      minWidth: "2.2rem",
                      minHeight: "2.2rem",
                      border: "3px solid rgb(111, 108, 108)",
                    }
                  : {}
              }
              onClick={() => setSelectedBg(8)}
            ></div>
          </div>
        </div>
        <input
          type="file"
          name="storyBgImage"
          className="postAttachmentInput"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
        />
        <button
          type="button"
          className="uploadStoryBackground"
          onClick={handleFileUpload}
        >
          {crossFlag ? "Image uploaded" : "Attach image as background"}
          {crossFlag && (
            <div
              className="fileUploadCross"
              onClick={() => {
                setSelectedFile({});
                setCrossFlag(false);
              }}
            >
              x
            </div>
          )}
        </button>
        <div className="postCategoryContainer">
          <p className="storyVisibility">Who can see</p>
          <select
            id="postCategory"
            name="postCategory"
            className="storyVisibilityButton"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="public" className="storyVisibilityOption">
              Anyone
            </option>
            <option value="protected" className="storyVisibilityOption">
              Friends
            </option>
            <option value="onlyMe" className="storyVisibilityOption">
              Only me
            </option>
          </select>
        </div>
      </div>
      <div className="createPostSecondRow">
        <button
          type="submit"
          className={
            isDisable
              ? "createStoryButton disabledCreatePost"
              : "createStoryButton createStoryHover"
          }
          disabled={isDisable}
        >
          Upload
        </button>
      </div>
    </form>
  );
};

export default CreateStory;
