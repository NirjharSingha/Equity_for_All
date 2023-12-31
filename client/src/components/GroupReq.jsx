import React, { useState } from "react";
import ItemCard from "./ItemCard";
import { useGroupContext } from "../contexts/GroupContext";
import { BsFillGearFill } from "react-icons/bs";
import { useGlobals } from "../contexts/Globals";
import axios from "axios";

const GroupReq = ({ member, setState }) => {
  const { access, selectedGroup, setShowAlertMsg, setAlertMsg } =
    useGroupContext();
  const { setIsValidJWT } = useGlobals();
  const [show, setShow] = useState(false);
  const handleReq = async (option, action, notificationMessage) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/group/addOrRemove`,
        {
          option: option,
          action: action,
          groupId: selectedGroup._id,
          email: member.email,
          notificationMessage: notificationMessage,
          notificationTarget: member.email,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.status == 200) {
        if (action === "add") {
          setAlertMsg(`The member is added to the group`);
        }
        if (action === "remove") {
          setAlertMsg(`Request declined`);
        }
        setState((prevMembers) => {
          return prevMembers.filter(
            (member) => member.email !== response.data.email
          );
        });
        setShowAlertMsg(true);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        setIsValidJWT(false);
      }
    }
  };
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
          <button
            className={`groupBarButton groupBarButton2`}
            onClick={() => {
              handleReq("reqReceived", "remove", "");
              handleReq(
                "allMembers",
                "add",
                `Your join request to the group ${selectedGroup.groupName} has been accepted`
              );
            }}
          >
            Accept
          </button>
          <button
            className={`groupBarButton groupBarButton2`}
            style={{ justifySelf: "end" }}
            onClick={() => {
              handleReq(
                "reqReceived",
                "remove",
                `Your join request to the group ${selectedGroup.groupName} has been declined`
              );
            }}
          >
            Decline
          </button>
        </div>
      )}
    </>
  );
};

export default GroupReq;
