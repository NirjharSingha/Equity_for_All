import React from "react";
import { useState, useEffect } from "react";
import FriendProfile from "./FriendProfile";
import "./PersonCard.css";
import { useFriendContext } from "../contexts/FriendContext";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { useVerifyFileContext } from "../contexts/VerifyFileContext";
import { useDisplayUserContext } from "../contexts/DisplayUserContext";
import axios from "axios";
import ConfirmWindow from "./ConfirmWindow";

const PersonCard = ({ email }) => {
  const {
    showFriendProfile,
    setShowFriendProfile,
    friendProfileRef,
    friendsID,
    setFriendsID,
    selectedOption,
    setSelectedOption,
    reqReceivedID,
    setReqReceivedID,
    blockID,
    setBlockID,
    reqSendID,
    setReqSendID,
    fetchSuggessions,
    setFetchSuggessions,
    suggessionsID,
    setSuggessionsID,
  } = useFriendContext();

  const { getUserInfo } = useUserInfoContext();
  const { isFileExists } = useVerifyFileContext();
  const { displayUser } = useDisplayUserContext();
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");
  const [shouldDisplayUserImg, setShouldDisplayUserImg] = useState(false);
  const [mutualFriends, setMutualFriends] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const displayPerson = async () => {
      const { name, profilePic } = await getUserInfo(email);
      setUserName(name), setUserImg(profilePic);
      displayUser(isFileExists, setShouldDisplayUserImg, profilePic);
    };

    const countMutualFriends = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/user/countMutualFriends?friendEmail=${email}`,
          {
            headers: {
              token: token,
            },
          }
        );
        setMutualFriends(response.data.commonFriendsCount);
      } catch (error) {
        console.log(error);
      }
    };

    displayPerson();
    countMutualFriends();
    console.log("person card loaded");
  }, []);

  const updateFriends = async (option, action) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/user/updateFriends`,
        { friendEmail: email, option: option, action: action },
        {
          headers: {
            token: token,
          },
        }
      );
      if (response) {
        console.log("update successful");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateIDArray = (setArray, action) => {
    if (action === "add") {
      setArray((prev) => [email, ...prev]);
    } else {
      setArray((prev) =>
        prev.filter((existingEmail) => existingEmail !== email)
      );
    }
  };

  const handleAddFriend = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/user/isBlocked?friendEmail=${email}`,
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.data.message === "blocked") {
        setShowMessage(true);
        return;
      } else {
        updateFriends("friendRequestSend", "add");
        updateIDArray(setReqSendID, "add");
        updateIDArray(setSuggessionsID, "remove");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {showMessage && (
        <ConfirmWindow
          setShowConfirm={setShowMessage}
          isConfirmWindow={false}
          messageToShow={
            "Sorry, the user has blocked you. This request cannot be sent."
          }
        />
      )}
      {showFriendProfile && <FriendProfile />}
      <div className="personCardContainer">
        <div
          className="personImg personCardElement"
          onClick={() => setShowFriendProfile(true)}
        >
          {shouldDisplayUserImg && (
            <img src={userImg} alt="" className="personImg" />
          )}
        </div>
        <p className="personName">{userName}</p>
        <p className="personText">{mutualFriends} mutual friends</p>
        {selectedOption === 0 && (
          <>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                updateFriends("friends", "remove");
                updateIDArray(setFriendsID, "remove");
              }}
            >
              Unfriend
            </button>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                updateFriends("friends", "remove");
                updateIDArray(setFriendsID, "remove");
                updateFriends("blockList", "add");
                updateIDArray(setBlockID, "add");
              }}
            >
              Block
            </button>
          </>
        )}
        {selectedOption === 1 && (
          <>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                updateFriends("friendRequestSend", "remove");
                updateIDArray(setReqSendID, "remove");
              }}
            >
              Cancel Request
            </button>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                updateFriends("friendRequestSend", "remove");
                updateIDArray(setReqSendID, "remove");
                updateFriends("blockList", "add");
                updateIDArray(setBlockID, "add");
              }}
            >
              Block
            </button>
          </>
        )}
        {selectedOption === 2 && (
          <>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                updateFriends("friendRequestReceived", "remove");
                updateIDArray(setReqReceivedID, "remove");
                updateFriends("friends", "add");
                updateIDArray(setFriendsID, "add");
              }}
            >
              Accept
            </button>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                updateFriends("friendRequestReceived", "remove");
                updateIDArray(setReqReceivedID, "remove");
              }}
            >
              Decline
            </button>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                updateFriends("friendRequestReceived", "remove");
                updateIDArray(setReqReceivedID, "remove");
                updateFriends("blockList", "add");
                updateIDArray(setBlockID, "add");
              }}
            >
              Block
            </button>
          </>
        )}
        {selectedOption === 3 && (
          <>
            <button
              className="personCardButton personCardElement"
              onClick={handleAddFriend}
            >
              Add friend
            </button>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                updateFriends("blockList", "add");
                updateIDArray(setBlockID, "add");
                updateIDArray(setSuggessionsID, "remove");
              }}
            >
              Block
            </button>
          </>
        )}
        {selectedOption === 4 && (
          <>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                updateFriends("blockList", "remove");
                updateIDArray(setBlockID, "remove");
              }}
            >
              Unblock
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonCard;
