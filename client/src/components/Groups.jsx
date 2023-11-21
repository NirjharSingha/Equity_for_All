import React from "react";
import "./Groups.css";
import { useEffect } from "react";
import CreateGroup from "./CreateGroup";
import { useGroupContext } from "../contexts/GroupContext";
import EditPost from "./EditPost";
import AlertMessage from "./AlertMessage";
import GroupStream from "./GroupStream";

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
  } = useGroupContext();

  useEffect(() => {
    console.log("group component loaded");
    return () => {
      setSelectedGroup(null);
      setShowAlertMsg(false);
    };
  }, []);

  return (
    <div className="homeDiv">
      {showAlert && (
        <AlertMessage alertMessage={alertMessage} setState={setShowAlertMsg} />
      )}
      {selectedGroup === null && (
        <p className="selectGroupText">Select a group to view details</p>
      )}
      {(showCreateGroup || isEditGroup) && <CreateGroup />}
      {isGroupPost && <EditPost />}
      {selectedGroup !== null && (
        <div className="groupContainer" ref={divRef}>
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
              <button className="grpPageBtn">Stream</button>
              <button className="grpPageBtn">Members</button>
              <button className="grpPageBtn">Requests</button>
            </div>
          </div>
          <GroupStream />
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
