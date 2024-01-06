import React from "react";
import "./ChatCard.css";
import { BsThreeDots } from "react-icons/bs";
import AllLikes from "./Likes";
import { useState } from "react";

const ChatCard = () => {
  const [selected, setSelected] = useState("");
  const [shouldDisplayAllLikes, setShouldDisplayAllLikes] = useState(false);
  return (
    <div className="singleChatCon">
      <div className="singleChat">
        <div className="singleChatMessage">Lorem ipsum,</div>
        <div key={1}>
          {/* {attachment.endsWith(".jpg") ||
        attachment.endsWith(".png") ||
        attachment.endsWith(".jpeg") ? ( */}
          {/* <img
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
          /> */}
          {/* ) : attachment.endsWith(".mp4") ? ( */}
          {/* <video controls width="200">
            <source
              src={
                "https://res.cloudinary.com/dsk08ceun/video/upload/v1703035544/your_folder_name/testVideo.mp4.mp4"
              }
              controls
              className="postFiles"
            />
          </video> */}
          {/* ) : (
          <p></p>
        )} */}
        </div>
        <div className="singleChatTime">Lorem ipsum dolor</div>
        <div className="chatReactContainer"></div>
      </div>
      <BsThreeDots style={{ color: "grey", cursor: "pointer" }} />
      <div className="chatSideBar">
        <>
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
        </>
        <button className="chatSidebarButton">Log out</button>
        <div style={{ borderRadius: "10px", backgroundColor: "black" }}>
          {/* <AllLikes
            setSelected={setSelected}
            setShouldDisplayAllLikes={setShouldDisplayAllLikes}
            isCommentPage={true}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
