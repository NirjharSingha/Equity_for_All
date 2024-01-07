import React from "react";
import "./ChatCard.css";
import { BsThreeDots } from "react-icons/bs";
import AllLikes from "./Likes";
import { useState } from "react";

const ChatCard = () => {
  const [selected, setSelected] = useState("");
  const [shouldDisplayAllLikes, setShouldDisplayAllLikes] = useState(false);
  const [flag] = useState(1);
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
        <div className="singleChatMessage">Lorem ipsum,</div>
        <div key={1}>
          {/* {attachment.endsWith(".jpg") ||
        attachment.endsWith(".png") ||
        attachment.endsWith(".jpeg") ? ( */}
          <img
            key={1}
            src={
              "https://res.cloudinary.com/dsk08ceun/image/upload/v1703035274/your_folder_name/Screenshot%20from%202023-12-18%2001-12-05.png.png"
            }
            alt=""
            style={{ maxWidth: "200px" }}
            // height={200}
            // ref={(el) => (imageRef.current[index] = el)}
            // onClick={() => toggleFullscreen(index)}
            className="postFiles"
          />
          {/* ) : attachment.endsWith(".mp4") ? ( */}
          <video controls width="200">
            <source
              src={
                "https://res.cloudinary.com/dsk08ceun/video/upload/v1703035544/your_folder_name/testVideo.mp4.mp4"
              }
              controls
              className="postFiles"
            />
          </video>
          {/* ) : (
          <p></p>
        )} */}
        </div>
        <div className="singleChatTime">Lorem ipsum dolor</div>
        <div
          className="chatReactContainer"
          style={flag === 1 ? { left: "0" } : { right: "0" }}
        ></div>
      </div>
      <BsThreeDots style={{ color: "grey", cursor: "pointer" }} />
      <div
        className="chatSideBar"
        style={flag === 1 ? { left: "150px" } : { right: "5px" }}
      >
        {/* <>
          <button className="chatSidebarButton">Profile</button>
          <button
            className="chatSidebarButton"
            // onClick={() => {
            //   setShowNotifications(true);
            //   setState(false);
            // }}
          >
            Notification
          </button>
          <button className="chatSidebarButton">Log out</button>
        </> */}

        <AllLikes
          setSelected={setSelected}
          setShouldDisplayAllLikes={setShouldDisplayAllLikes}
          isCommentPage={true}
        />
      </div>
    </div>
  );
};

export default ChatCard;
