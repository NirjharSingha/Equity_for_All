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
    selectedGroup,
    searchTime,
  } = useGroupContext();
  const [showLoading, setShowLoading] = useState(false);
  const { setIsValidJWT, windowWidth } = useGlobals();

  const isGroupInResponse = (response, groupId) => {
    const {
      createdGroups,
      joinedGroups,
      reqSentGroups,
      invitationReceivedGroups,
      groupSuggessions,
    } = response;

    const allGroups = [
      ...createdGroups,
      ...joinedGroups,
      ...reqSentGroups,
      ...invitationReceivedGroups,
      ...groupSuggessions,
    ];

    return allGroups.some((group) => group._id === groupId);
  };

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
        if (selectedGroup !== null) {
          const ans = isGroupInResponse(response.data, selectedGroup._id);
          if (!ans) {
            response.data.groupSuggessions.push(selectedGroup);
          }
        }
        setGroupsYouCreated(response.data.createdGroups);
        setGroupsYouJoined(response.data.joinedGroups);
        setReqSent(response.data.reqSentGroups);
        setInvitationReceived(response.data.invitationReceivedGroups);
        setSuggestGroups(response.data.groupSuggessions);
        setShowLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("inside status code");
        setIsValidJWT(false);
      }
    }
  };
  useEffect(() => {
    fetchGroupNames();
  }, []);

  useEffect(() => {
    const searchGrp = async () => {
      if (searchTime !== "") {
        const response = {
          createdGroups: groupsYouCreated,
          joinedGroups: groupsYouJoined,
          reqSentGroups: reqSent,
          invitationReceivedGroups: invitationReceived,
          groupSuggessions: suggestedGroups,
        };
        const ans = isGroupInResponse(response, searchTime);
        if (!ans) {
          const token = localStorage.getItem("token");
          const res = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/group/getGroup/${searchTime}`,
            {
              headers: {
                token: token,
              },
            }
          );
          if (res) {
            setSuggestGroups((prev) => [...prev, res.data]);
          }
        }
      }
    };
    searchGrp();
  }, [searchTime]);

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
