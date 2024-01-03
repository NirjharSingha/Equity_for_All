import React from "react";
import "./Chat.css";
import { useEffect, useState } from "react";
import ChatSearch from "./ChatSearch";
import ItemCard from "./ItemCard";

const Chat = () => {
  useEffect(() => {
    console.log("chat component loaded");
  }, []);

  const [selectedOption, setSelectedOption] = useState("inbox");

  return (
    <div className="chatContainer">
      <p className="chatHeading">Chats</p>
      <ChatSearch />
      <div className="grpOptionBtn">
        <button
          className={
            selectedOption === "inbox" ? "selectedGrpOption" : "grpPageBtn"
          }
          onClick={() => setSelectedOption("inbox")}
        >
          Inbox
        </button>
        <button
          className={
            selectedOption === "groups" ? "selectedGrpOption" : "grpPageBtn"
          }
          onClick={() => setSelectedOption("groups")}
        >
          Groups
        </button>
      </div>
      <div className="chatCardContainer">
        <div key={1} className="chatCard">
          <ItemCard
            key={1}
            containerClass="chatCardVerticalLine"
            imgClass="optionListImg"
            nameClass="optionListName"
            shouldDisplayImg={false}
            imgSrc={""}
            icon="/profilePicIcon.svg"
            name={
              "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
            }
          />
          <div
            style={{
              height: "100%",
              aspectRatio: "1/1",
              borderRadius: "50%",
              backgroundColor: "grey",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "0.7rem",
              fontWeight: "bold",
              padding: "3px",
              color: "white",
            }}
          >
            12
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
