import React from "react";
import "./Groups.css";
import { useEffect, useState } from "react";
import { useGroupContext } from "../contexts/GroupContext";
import { useGlobals } from "../contexts/Globals";
import EditPost from "./EditPost";
import AlertMessage from "./AlertMessage";
import GroupStream from "./GroupStream";
import GroupMembers from "./GroupMembers";
import GroupRequests from "./GroupRequests";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Group = () => {
  const {
    isGroupPost,
    showAlert,
    setShowAlertMsg,
    alertMessage,
    divRef,
    selectedGroup,
    setSelectedGroup,
    access,
    selectedOption,
    setSelectedOption,
  } = useGroupContext();
  const { windowWidth, setIsValidJWT } = useGlobals();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [pics, setPics] = useState([]);

  useEffect(() => {
    console.log("group component loaded");
    return () => {
      if (windowWidth >= 800) {
        setSelectedGroup(null);
      }
      setShowAlertMsg(false);
      setSelectedOption("stream");
    };
  }, []);

  useEffect(() => {
    const groupFriends = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/group/groupFriends/${
            selectedGroup._id
          }`,
          {
            headers: {
              token: token,
            },
          }
        );
        if (response) {
          const { count, pic } = response.data;
          setCount(count);
          setPics(pic);
        }
      } catch (error) {
        if (
          error.response.status === 401 &&
          error.response.statusText === "Unauthorized"
        ) {
          console.log("inside status code");
          setIsValidJWT(false);
        }
        console.log(error);
      }
    };
    if (selectedGroup !== null) groupFriends();
  }, [selectedGroup]);

  useEffect(() => {
    if (windowWidth >= 800) {
      const currentUrl = window.location.href;
      if (currentUrl === `${import.meta.env.VITE_CLIENT_URL}main/groups/id`) {
        navigate("/main/groups");
        setSelectedGroup(null);
      }
    }
  }, [windowWidth]);

  return (
    <div className="homeDiv">
      {selectedGroup === null && (
        <p className="selectGroupText">Select a group to view details</p>
      )}
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
            {pics && pics.length > 0 && (
              <div className="friendsInGrp">
                {pics.map((pic, index) => (
                  <img src={pic} key={index} className="grpFriend" />
                ))}
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ marginBottom: "0.5rem", marginTop: "0.3rem" }}>
                {count > 0
                  ? `Your ${count} friends are members here`
                  : `You have no friend in this group`}
              </p>
              {(access === 1 || access === 2) && (
                <button className="invite">Invite</button>
              )}
            </div>
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
