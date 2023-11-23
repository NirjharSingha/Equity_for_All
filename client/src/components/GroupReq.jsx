import React, { useState } from "react";
import ItemCard from "./ItemCard";
import { useGroupContext } from "../contexts/GroupContext";
import { BsFillGearFill } from "react-icons/bs";

const GroupReq = ({ member }) => {
  const { access } = useGroupContext();
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        className="grpMember"
        style={
          show
            ? {
                borderBottomLeftRadius: "0",
                borderBottomRightRadius: "0",
                gridTemplateColumns: "auto 1.5rem",
                marginBottom: `0rem`,
              }
            : {
                gridTemplateColumns: "auto 1.5rem",
                marginBottom: `0rem`,
              }
        }
      >
        <ItemCard
          containerClass="grpMem"
          imgClass="storyProfilePic"
          nameClass="optionListName"
          shouldDisplayImg={member.profilePic !== ""}
          imgSrc={member.profilePic}
          icon="/profilePicIcon.svg"
          name={member.name}
        />
        {access === 1 && (
          <div
            style={{
              gridColumn: "2",
              backgroundColor: "rgb(227, 224, 224)",
              zIndex: "100",
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "100%",
              borderRadius: "0.3rem",
              borderBottomLeftRadius: "0",
            }}
          >
            <BsFillGearFill
              className="groupBarIcon"
              onClick={() => setShow((prev) => !prev)}
            />
          </div>
        )}
      </div>
      {show && (
        <div className="groupBarBtnContainer" style={{ height: "2rem" }}>
          <button className={`groupBarButton groupBarButton2`}>Accept</button>
          <button
            className={`groupBarButton groupBarButton2`}
            style={{ justifySelf: "end" }}
          >
            Decline
          </button>
        </div>
      )}
    </>
  );
};

export default GroupReq;
