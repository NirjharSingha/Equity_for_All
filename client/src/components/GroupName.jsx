import React, { useState } from "react";
import ItemCard from "./ItemCard";
import { BsFillGearFill } from "react-icons/bs";

const GroupName = ({ name, image, visibility, flag }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        className="groupItem"
        style={
          show
            ? { borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }
            : {}
        }
      >
        <ItemCard
          containerClass="groupItem2"
          imgClass="storyProfilePic"
          nameClass="optionListName"
          shouldDisplayImg={image !== ""}
          imgSrc={image}
          icon="/profilePicIcon.svg"
          name={name}
        />
        <BsFillGearFill
          className="groupBarIcon"
          onClick={() => setShow((prev) => !prev)}
        />
      </div>
      {show && flag === 1 && (
        <button className={`groupBarButton`}>Delete Group</button>
      )}
      {show && flag === 2 && (
        <button className={`groupBarButton`}>Leave Group</button>
      )}
      {show && flag === 3 && (
        <button className={`groupBarButton`}>Cancel Request</button>
      )}
      {show && flag === 4 && (
        <div className="groupBarBtnContainer">
          <button className={`groupBarButton groupBarButton2`}>Accept</button>
          <button
            className={`groupBarButton groupBarButton2`}
            style={{ justifySelf: "end" }}
          >
            Decline
          </button>
        </div>
      )}
      {show && flag === 5 && (
        <button className={`groupBarButton`}>Join Group</button>
      )}
    </>
  );
};

export default GroupName;
