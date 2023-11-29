import React from "react";
import "./Groups.css";
import { useEffect } from "react";
import CreateGroup from "./CreateGroup";
import { useGroupContext } from "../contexts/GroupContext";
import { useGlobals } from "../contexts/Globals";
import EditPost from "./EditPost";
import AlertMessage from "./AlertMessage";
import GroupStream from "./GroupStream";
import GroupMembers from "./GroupMembers";
import GroupRequests from "./GroupRequests";
import { useNavigate } from "react-router-dom";

const Group = () => {
  const {
    showCreateGroup,
    isGroupPost,
    showAlert,
    setShowAlertMsg,
    alertMessage,
    isEditGroup,
    divRef,
    selectedGroup,
    setSelectedGroup,
    access,
    selectedOption,
    setSelectedOption,
  } = useGroupContext();
  const { windowWidth } = useGlobals();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("group component loaded");
    console.log(selectedGroup);
    console.log("access " + access);
    return () => {
      if (windowWidth >= 800) {
        setSelectedGroup(null);
      }
      setShowAlertMsg(false);
      setSelectedOption("stream");
    };
  }, []);

  useEffect(() => {
    if (windowWidth >= 800) {
      const currentUrl = window.location.href;
      if (currentUrl === "http://localhost:5173/main/groups/id") {
        navigate("/main/groups");
        setSelectedGroup(null);
      }
    }
  }, [windowWidth]);

  return (
    <div className="homeDiv">
      {/* {showAlert && (
        <AlertMessage alertMessage={alertMessage} setState={setShowAlertMsg} />
      )} */}
      {selectedGroup === null && (
        <p className="selectGroupText">Select a group to view details</p>
      )}
      {/* {(showCreateGroup || isEditGroup) && <CreateGroup />} */}
      {isGroupPost && <EditPost />}
      {selectedGroup !== null && (
        <div className="groupContainer" ref={divRef}>
          {showAlert && windowWidth >= 800 && (
            <AlertMessage
              alertMessage={alertMessage}
              setState={setShowAlertMsg}
            />
          )}
          <img
            src={
              selectedGroup && selectedGroup.groupImage !== ""
                ? selectedGroup.groupImage
                : "/group.png"
            }
            className="groupImage"
          ></img>
          <div className="groupInfo">
            <p className="grpName">
              {selectedGroup && selectedGroup.groupName}
            </p>
            <p className="grpName" style={{ fontSize: "1.15rem" }}>
              {`${selectedGroup && selectedGroup.groupVisibility} group`}
            </p>
            <div className="friendsInGrp">
              <div className="grpFriend"></div>
              <div className="grpFriend"></div>
              <div className="grpFriend"></div>
              <div className="grpFriend"></div>
            </div>
            <p style={{ marginBottom: "0.5rem" }}>Your x friends are members</p>
            <hr />
            <div className="grpOptionBtn">
              <button
                className={
                  selectedOption === "stream"
                    ? "selectedGrpOption"
                    : "grpPageBtn"
                }
                onClick={() => setSelectedOption("stream")}
              >
                Stream
              </button>
              <button
                className={
                  selectedOption === "members"
                    ? "selectedGrpOption"
                    : "grpPageBtn"
                }
                onClick={() => setSelectedOption("members")}
              >
                Members
              </button>
              <button
                className={
                  selectedOption === "requests"
                    ? "selectedGrpOption"
                    : "grpPageBtn"
                }
                onClick={() => setSelectedOption("requests")}
              >
                Requests
              </button>
            </div>
          </div>
          {selectedOption === "stream" && <GroupStream />}
          {selectedOption === "members" && access !== 0 && <GroupMembers />}
          {selectedOption === "requests" && access !== 0 && <GroupRequests />}
          {access === 0 && (
            <p className="createPostCard groupAccessText">
              This is private group. You cannot see its content without being a
              member.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Group;
