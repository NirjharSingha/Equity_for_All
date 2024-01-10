import React, { useState, useEffect } from "react";
import "./ChatBox.css";
import { useGlobals } from "../contexts/Globals";
import { BsEmojiSmile } from "react-icons/bs";
import { IoAttachOutline } from "react-icons/io5";
import { BiSolidSend } from "react-icons/bi";
import ChatCard from "./ChatCard";
import ItemCard from "./ItemCard";
import EmojiList from "./EmojiList";
import { useRef } from "react";
import axios from "axios";
import { useChat } from "../contexts/ChatContext";
import { TbReload } from "react-icons/tb";

const ChatBox = ({ chatUser }) => {
  const [isRotating, setIsRotating] = useState(false);
  const { setIsValidJWT, windowWidth } = useGlobals();
  const [showEmojis, setShowEmojis] = useState(false);
  const fileInputRef = useRef(null);
  const {
    selectedFiles,
    setSelectedFiles,
    inputValue,
    setInputValue,
    chats,
    setChats,
    chatToEdit,
    setChatToEdit,
    prevFiles,
    setPrevFiles,
  } = useChat();
  const inputRef = useRef(null);
  const emojiRef = useRef(null);
  const Ref = useRef(null);
  const [showLoading, setShowLoading] = useState(false);

  const handleRotateClick = () => {
    setIsRotating(true);
    setChatToEdit("");
    setInputValue("");
    setSelectedFiles([]);
    setPrevFiles([]);
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
  };

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

    const fetchChats = async () => {
      try {
        setShowLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/chat/getChats/${chatUser.id}`,
          {
            headers: {
              token: token,
            },
          }
        );
        if (response) {
          setChats(response.data);
          console.log(response.data);
          setShowLoading(false);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
        if (error.response.status === 401) {
          setIsValidJWT(false);
        }
      }
    };

    fetchChats();

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
          borderTopRightRadius: `${windowWidth > 440 ? 0 : "10px"}`,
          backgroundColor: "rgb(162, 158, 158)",
          height: "2.1rem",
          backgroundColor: "rgb(197, 190, 190)",
        }}
      >
        <TbReload
          className={`commentReload rotating-element ${
            isRotating ? "rotate-once" : ""
          }`}
          onClick={handleRotateClick}
        />
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
        {chats.map((chat) => (
          <ChatCard key={chat._id} chat={chat} />
        ))}
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
          </p>
          <div
            className="chatFileUploadCross"
            style={{ maxWidth: "0.5rem", maxHeight: "0.5rem", width: "0.5rem" }}
          >
            <p
              style={{ fontSize: "0.8rem" }}
              onClick={() => {
                setSelectedFiles([]);
                setPrevFiles([]);
              }}
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
