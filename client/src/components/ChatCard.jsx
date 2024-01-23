import React, { useEffect } from "react";
import "./ChatCard.css";
import { BsThreeDots } from "react-icons/bs";
import { useState, useRef } from "react";
import jwtDecode from "jwt-decode";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaLaughSquint, FaSadCry, FaAngry } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import ChatCardSideBar from "./ChatCardSideBar";
import ChatLikes from "./ChatLikes";
import { useChat } from "../contexts/ChatContext";
import { BsEmojiSmile } from "react-icons/bs";
import { useGlobals } from "../contexts/Globals";

const ChatCard = ({ chat, handleDelete, updateLike }) => {
  const [shouldDisplayAllLikes, setShouldDisplayAllLikes] = useState(false);
  const imageRef = useRef([]);
  const {
    _id,
    sender,
    receiver,
    messageText,
    messageAttachments,
    time,
    react,
    replyId,
    updatedAt,
    deletedAt,
  } = chat;

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

  const [selectedLike, setSelectedLike] = useState(react);
  const [isMount, setIsMount] = useState(true);
  const currentUser = jwtDecode(localStorage.getItem("token")).email;
  const flag = sender === currentUser ? 1 : 0;
  const [showChatSideBar, setShowChatSideBar] = useState(false);
  const { setIsValidJWT } = useGlobals();

  const toggleFullscreen = (index) => {
    const imageElement = imageRef.current[index];

    if (!document.fullscreenElement) {
      if (imageElement.requestFullscreen) {
        imageElement.requestFullscreen();
      } else if (imageElement.mozRequestFullScreen) {
        imageElement.mozRequestFullScreen();
      } else if (imageElement.webkitRequestFullscreen) {
        imageElement.webkitRequestFullscreen();
      } else if (imageElement.msRequestFullscreen) {
        imageElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleEdit = () => {
    setInputValue(messageText);
    setSelectedFiles(messageAttachments);
    setPrevFiles(messageAttachments);
    setChatToEdit(_id);
    setShowChatSideBar(false);
  };

  useEffect(() => {
    if (!isMount) {
      updateLike(_id, selectedLike, setShouldDisplayAllLikes);
    } else {
      setIsMount(false);
    }
  }, [selectedLike]);

  useEffect(() => {
    setSelectedLike(chat.react);
  }, [chat.react]);

  return (
    <div
      className="singleChatCon"
      style={flag === 1 ? { flexDirection: "row-reverse" } : {}}
    >
      <div
        className="singleChat"
        style={
          flag === 1
            ? {
                borderTopRightRadius: "0",
                borderTopLeftRadius: "0.9rem",
                backgroundColor: "#50b5f8",
                justifySelf: "flex-end",
              }
            : {}
        }
      >
        <div className="singleChatMessage">{messageText}</div>
        {messageAttachments.map((attachment, index) => (
          <div key={index}>
            {attachment.endsWith(".jpg") ||
            attachment.endsWith(".png") ||
            attachment.endsWith(".jpeg") ? (
              <img
                key={index}
                src={attachment}
                alt=""
                width={200}
                height={200}
                ref={(el) => (imageRef.current[index] = el)}
                onClick={() => toggleFullscreen(index)}
                style={{ maxWidth: "200px" }}
                className="postFiles"
              />
            ) : attachment.endsWith(".mp4") ? (
              <video controls width="200">
                <source src={attachment} controls className="postFiles" />
              </video>
            ) : (
              <p key={index}></p>
            )}
          </div>
        ))}
        <div
          className="singleChatTime"
          style={
            selectedLike !== "" && flag === 0
              ? { paddingRight: "1.2rem", fontSize: "0.8rem" }
              : { fontSize: "0.65rem" }
          }
        >
          {new Date(time).toLocaleString()}
        </div>
        {selectedLike !== "" && (
          <div
            className="chatReactContainer"
            style={flag === 1 ? { left: "0" } : { right: "0" }}
            onClick={() => {
              if (receiver === currentUser) {
                setSelectedLike("");
              }
            }}
          >
            {selectedLike === "like" ? (
              <AiFillLike
                className="iconFlex blue"
                style={{ fontSize: "1rem" }}
              />
            ) : selectedLike === "dislike" ? (
              <AiFillDislike
                className="iconFlex blue"
                style={{ fontSize: "1rem" }}
              />
            ) : selectedLike === "laugh" ? (
              <FaLaughSquint
                className="iconFlex yellow"
                style={{ fontSize: "1rem" }}
              />
            ) : selectedLike === "angry" ? (
              <FaAngry className="iconFlex red" style={{ fontSize: "1rem" }} />
            ) : selectedLike === "sad" ? (
              <FaSadCry
                className="iconFlex yellow"
                style={{ fontSize: "1rem" }}
              />
            ) : selectedLike === "love" ? (
              <FcLike className="iconFlex" style={{ fontSize: "1rem" }} />
            ) : (
              <AiOutlineLike
                className="likeIcon iconFlex"
                style={{ fontSize: "1rem" }}
              />
            )}
          </div>
        )}
      </div>
      {flag === 1 ? (
        <BsThreeDots
          style={{ color: "grey", cursor: "pointer", margin: "0.2rem" }}
          onClick={() => setShowChatSideBar(true)}
        />
      ) : (
        <BsEmojiSmile
          style={{ color: "grey", cursor: "pointer", margin: "0.2rem" }}
          onClick={() => setShouldDisplayAllLikes(true)}
        />
      )}
      {showChatSideBar && (
        <ChatCardSideBar
          flag={flag}
          setShowChatSideBar={setShowChatSideBar}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          _id={_id}
        />
      )}
      {shouldDisplayAllLikes && (
        <ChatLikes
          flag={flag}
          setSelectedLike={setSelectedLike}
          setShouldDisplayAllLikes={setShouldDisplayAllLikes}
        />
      )}
    </div>
  );
};

export default ChatCard;
