import React from "react";
import "./GroupsBar.css";
import { FaPlus } from "react-icons/fa";
import { useGroupContext } from "../contexts/GroupContext";
import { useGlobals } from "../contexts/Globals";
import GroupName from "./GroupName";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const GroupsBar = () => {
  const {
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
    selectedGroup,
    access,
    setAccess,
  } = useGroupContext();
  const [showLoading, setShowLoading] = useState(false);
  const { setIsValidJWT } = useGlobals();

  useEffect(() => {
    console.log("selectedGroup " + selectedGroup);
    let foundGroup = null;
    console.log("length " + groupsYouCreated.length);

    if (selectedGroup) {
      for (let index = 0; index < groupsYouCreated.length; index++) {
        const element = groupsYouCreated[index];
        if (element._id === selectedGroup._id) {
          console.log("group found");
          foundGroup = element;
          break;
        }
      }
    }

    if (foundGroup) {
      setAccess(1);
    } else {
      if (selectedGroup) {
        for (let index = 0; index < groupsYouJoined.length; index++) {
          const element = groupsYouJoined[index];
          if (element._id === selectedGroup._id) {
            foundGroup = element;
            break;
          }
        }
      }

      if (foundGroup) {
        setAccess(2);
      } else {
        if (selectedGroup && selectedGroup.groupVisibility === "public") {
          setAccess(3);
        } else {
          setAccess(0);
        }
      }
    }
  }, [selectedGroup]);

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