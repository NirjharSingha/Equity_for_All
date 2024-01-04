import React from "react";
import "./ChatBox.css";
import { useGlobals } from "../contexts/Globals";
import { BsEmojiSmile } from "react-icons/bs";
import { IoAttachOutline } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";
import { BiSolidSend } from "react-icons/bi";

const ChatBox = () => {
  const { setIsValidJWT, windowWidth } = useGlobals();
  return (
    <div className="chatBox">
      <div
        className="commentCrossContainer"
        style={{
          justifyContent: "flex-end",
          borderTopRightRadius: `${windowWidth > 440 ? 0 : "10px"}`,
          backgroundColor: "rgb(162, 158, 158)",
          height: "2.1rem",
        }}
      >
        <button
          className="commentCross"
          //   onClick={() => setShowNotifications(false)}
        >
          X
        </button>
      </div>
      <div className="chatInboxContainer"></div>
      <div className="chatInputLine">
        <div style={{ display: "flex", width: "100%" }}>
          <div className="chatSearchIconConainer" style={{ width: "2.4rem" }}>
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

            //   onChange={(e) => handleInputChange(e.target.value)}
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
          >
            <IoAttachOutline
              className="commentEmojiIcon"
              style={{ fontSize: "1.2rem", color: "grey" }}
            />
          </div>
        </div>
        <div className="voiceMessage">
          <MdKeyboardVoice
            style={{ fontSize: "1.2rem", color: "rgb(114, 113, 113)" }}
          />
        </div>
        <BiSolidSend
          style={{
            fontSize: "1.4rem",
            marginTop: "0.5rem",
            marginLeft: "0.3rem",
            cursor: "pointer",
            color: "rgb(114, 113, 113)",
          }}
        />
      </div>
    </div>
  );
};

export default ChatBox;
