import React, { useState, useEffect } from "react";
import "./ChatBox.css";
import { useGlobals } from "../contexts/Globals";
import { BsEmojiSmile } from "react-icons/bs";
import { IoAttachOutline } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";
import { BiSolidSend } from "react-icons/bi";
import ChatCard from "./ChatCard";
import ItemCard from "./ItemCard";
import EmojiList from "./EmojiList";
import { useRef } from "react";
import axios from "axios";

const ChatBox = ({ chatUser }) => {
  const { setIsValidJWT, windowWidth } = useGlobals();
  const [showEmojis, setShowEmojis] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const emojiRef = useRef(null);
  const Ref = useRef(null);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
  };

  const handleSubmitChat = async (e) => {
    e.preventDefault();

    if (inputValue === "" && selectedFiles.length === 0) {
      return;
    }
    const chatData = new FormData();

    chatData.append("chatDescription", inputValue);
    chatData.append("time", new Date(Date.now()));
    chatData.append("receiver", chatUser.id);

    for (let i = 0; i < selectedFiles.length; i++) {
      chatData.append("chatAttachments", selectedFiles[i]);
    }

    try {
      const token = localStorage.getItem("token");
      let response;
      response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/chat/createChat`,
        chatData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );

      if (response) {
        console.log(response.data);
        setSelectedFiles([]);
        setInputValue("");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("inside status code");
        setIsValidJWT(false);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmitChat();
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        if (Ref.current && !Ref.current.contains(event.target)) {
          setShowEmojis(false);
        }
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="chatBox">
      <div
        className="commentCrossContainer"
        style={{
          justifyContent: "flex-end",
          borderTopRightRadius: `${windowWidth > 440 ? 0 : "10px"}`,
          backgroundColor: "rgb(162, 158, 158)",
          height: "2.1rem",
          backgroundColor: "rgb(197, 190, 190)",
        }}
      >
        <button
          className="commentCross"
          //   onClick={() => setShowNotifications(false)}
        >
          X
        </button>
      </div>
      <ItemCard
        containerClass="chatInboxHeading"
        imgClass="optionListImg"
        nameClass="optionListName"
        shouldDisplayImg={chatUser.profilePic !== ""}
        imgSrc={chatUser.profilePic}
        icon="/profilePicIcon.svg"
        name={chatUser.name}
      />
      <div className="chatInboxContainer">
        <ChatCard />
      </div>
      <form className="chatInputLine" encType="multipart/form-data">
        <div style={{ display: "flex", width: "100%" }}>
          {showEmojis && (
            <div
              className="commentMainEmoji"
              style={{ bottom: "1.9rem" }}
              ref={emojiRef}
            >
              <EmojiList setInputValue={setInputValue} inputRef={inputRef} />
            </div>
          )}
          <div
            className="chatSearchIconConainer"
            style={{ width: "2.4rem" }}
            onClick={() => setShowEmojis((prev) => !prev)}
            ref={Ref}
          >
            <BsEmojiSmile
              className="commentEmojiIcon"
              style={{ fontSize: "1.2rem", color: "grey" }}
            />
          </div>
          <input
            type="text"
            className="chatSearchInput"
            placeholder="Search in chat"
            style={{
              borderRadius: "0",
              borderRight: "none",
              minWidth: "calc(90% - 5.2rem)",
            }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            ref={inputRef}
            onKeyDown={handleKeyPress}
          />
          <div
            className="chatSearchIconConainer"
            style={{
              width: "2.4rem",
              borderTop: "2px solid grey",
              borderRight: "2px solid grey",
              borderBottom: "2px solid grey",
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
              borderTopRightRadius: "4rem",
              borderBottomRightRadius: "4rem",
              borderLeft: "none",
            }}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              name="chatAttachments"
              multiple
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*, video/*"
            />
            <IoAttachOutline
              className="commentEmojiIcon"
              style={{ fontSize: "1.2rem", color: "grey" }}
            />
          </div>
        </div>
        <BiSolidSend
          style={{
            fontSize: "1.4rem",
            marginTop: "0.5rem",
            marginLeft: "0.3rem",
            cursor: `${
              inputValue === "" && selectedFiles.length === 0
                ? "not-allowed"
                : "pointer"
            }`,
            color: "rgb(114, 113, 113)",
          }}
          onClick={handleSubmitChat}
        />
      </form>
      {selectedFiles.length > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: "5px",
            textAlign: "center",
            width: "100%",
            fontSize: "0.85rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>
            {selectedFiles.length +
              ` ${selectedFiles.length > 1 ? "files" : "file"} selected`}
            {/* {`${selectedFiles.length} files selected`} */}
          </p>
          <div
            className="chatFileUploadCross"
            style={{ maxWidth: "0.5rem", maxHeight: "0.5rem", width: "0.5rem" }}
          >
            <p
              style={{ fontSize: "0.8rem" }}
              onClick={() => setSelectedFiles([])}
            >
              x
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
