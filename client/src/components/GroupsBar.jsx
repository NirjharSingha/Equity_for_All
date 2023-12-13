import React from "react";
import "./GroupsBar.css";
import { FaPlus } from "react-icons/fa";
import { useGroupContext } from "../contexts/GroupContext";
import { useGlobals } from "../contexts/Globals";
import GroupName from "./GroupName";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import CreateGroup from "./CreateGroup";
import AlertMessage from "./AlertMessage";

const GroupsBar = () => {
  const {
    showCreateGroup,
    isEditGroup,
    setShowCreateGroup,
    groupsYouCreated,
    setGroupsYouCreated,
    groupsYouJoined,
    setGroupsYouJoined,
    reqSent,
    setReqSent,
    invitationReceived,
    setInvitationReceived,
    suggestedGroups,
    setSuggestGroups,
    setShowAlertMsg,
    alertMessage,
    showAlert,
  } = useGroupContext();
  const [showLoading, setShowLoading] = useState(false);
  const { setIsValidJWT, windowWidth } = useGlobals();

  const fetchGroupNames = async () => {
    try {
      setShowLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/group/groupNames`,
        {
          headers: {
            token: token,
          },
        }
      );
      if (response) {
        setGroupsYouCreated(response.data.createdGroups);
        setGroupsYouJoined(response.data.joinedGroups);
        setReqSent(response.data.reqSentGroups);
        setInvitationReceived(response.data.invitationReceivedGroups);
        setSuggestGroups(response.data.groupSuggessions);
        setShowLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        console.log("inside status code");
        setIsValidJWT(false);
      }
    }
  };
  useEffect(() => {
    fetchGroupNames();
  }, []);

  return (
    <div className="groupsBar">
      {showAlert && windowWidth < 800 && (
        <AlertMessage alertMessage={alertMessage} setState={setShowAlertMsg} />
      )}
      {(showCreateGroup || isEditGroup) && <CreateGroup />}
      <div
        className="createGroupButton"
        onClick={() => setShowCreateGroup(true)}
      >
        <FaPlus className="faPlus" />
        <p>Create New Group</p>
      </div>
      {showLoading && (
        <div className="loadingContainer">
          <Loading />
        </div>
      )}
      {!showLoading && groupsYouCreated.length > 0 && (
        <>
          <p className="groupBarHeadings">Groups you created</p>
          <hr style={{ width: "100%", marginTop: "0.35rem" }} />
          {groupsYouCreated.map((group) => (
            <GroupName key={group._id} group={group} flag={1} />
          ))}
        </>
      )}
      {!showLoading && groupsYouJoined.length > 0 && (
        <>
          <p className="groupBarHeadings">Groups you joined</p>
          <hr style={{ width: "100%", marginTop: "0.35rem" }} />
          {groupsYouJoined.map((group) => (
            <GroupName key={group._id} group={group} flag={2} />
          ))}
        </>
      )}
      {!showLoading && reqSent.length > 0 && (
        <>
          <p className="groupBarHeadings">Request Send</p>
          <hr style={{ width: "100%", marginTop: "0.35rem" }} />
          {reqSent.map((group) => (
            <GroupName key={group._id} group={group} flag={3} />
          ))}
        </>
      )}
      {!showLoading && invitationReceived.length > 0 && (
        <>
          <p className="groupBarHeadings">Invitation received</p>
          <hr style={{ width: "100%", marginTop: "0.35rem" }} />
          {invitationReceived.map((group) => (
            <GroupName key={group._id} group={group} flag={4} />
          ))}
        </>
      )}
      {!showLoading && suggestedGroups.length > 0 && (
        <>
          <p className="groupBarHeadings">Suggested groups</p>
          <hr style={{ width: "100%", marginTop: "0.35rem" }} />
          {suggestedGroups.map((group) => (
            <GroupName key={group._id} group={group} flag={5} />
          ))}
        </>
      )}
    </div>
  );
};

export default GroupsBar;
