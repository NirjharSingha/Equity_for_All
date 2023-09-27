import React from "react";
import { useState, useEffect } from "react";
import FriendProfile from "./FriendProfile";
import "./PersonCard.css";
import { useFriendContext } from "../contexts/FriendContext";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { useFileContext } from "../contexts/FileContext";
import { useDisplayUserContext } from "../contexts/DisplayUserContext";
import axios from "axios";
import ConfirmWindow from "./ConfirmWindow";

const PersonCard = ({ email }) => {
  const {
    friendsID,
    setFriendsID,
    selectedOption,
    setReqReceivedID,
    setBlockID,
    setReqSendID,
    setSuggessionsID,
    setFollowersID,
    followingsID,
    setFollowingsID,
    setShowAlert,
    setAlertMessage,
  } = useFriendContext();

  const { getUserInfo } = useUserInfoContext();
  const { isFileExists } = useFileContext();
  const { displayUser } = useDisplayUserContext();
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");
  const [shouldDisplayUserImg, setShouldDisplayUserImg] = useState(false);
  const [mutualFriends, setMutualFriends] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [messageToShow, setMessageToShow] = useState("");
  const [showFriendProfile, setShowFriendProfile] = useState(false);

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
          `${
            import.meta.env.VITE_SERVER_URL
          }/friend/countMutualFriends?friendEmail=${email}`,
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
        `${import.meta.env.VITE_SERVER_URL}/friend/updateFriends`,
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

  const handleAddFriend = async (isFollow) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/friend/isBlocked?friendEmail=${email}`,
        {
          headers: {
            token: token,
          },
        }
      );
      if (!isFollow) {
        if (response.data.message === "blocked") {
          setShowMessage(true);
          setMessageToShow(
            "Sorry, the user has blocked you. This request cannot be sent."
          );
          return;
        } else {
          updateFriends("friendRequestSend", "add");
          updateIDArray(setReqSendID, "add");
          updateIDArray(setSuggessionsID, "remove");
          setAlertMessage("friend request sent successfully");
          setShowAlert(true);
        }
      } else {
        if (response.data.message === "blocked") {
          setShowMessage(true);
          setMessageToShow(
            "Sorry, the user has blocked you. You cannot follow the user."
          );
          return;
        } else {
          console.log(response.data.message);
          updateFriends("followings", "add");
          updateIDArray(setFollowingsID, "add");
          setAlertMessage(`you have followed ${userName}`);
          setShowAlert(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlock = async (isFollowPage) => {
    setAlertMessage(`${userName} is blocked`);
    setShowAlert(true);
    if (isFollowPage) {
      updateFriends("followers", "remove");
      updateIDArray(setFollowersID, "remove");
      updateFriends("followings", "remove");
      updateIDArray(setFollowingsID, "remove");
      updateFriends("friends", "remove");
      updateIDArray(setFriendsID, "remove");
      updateFriends("friendRequestSend", "remove");
      updateIDArray(setReqSendID, "remove");
      updateFriends("friendRequestReceived", "remove");
      updateIDArray(setReqReceivedID, "remove");
      updateIDArray(setSuggessionsID, "remove");
      updateFriends("blockList", "add");
      updateIDArray(setBlockID, "add");
    } else {
      updateFriends("blockList", "add");
      updateIDArray(setBlockID, "add");
      updateFriends("followers", "remove");
      updateIDArray(setFollowersID, "remove");
      updateFriends("followings", "remove");
      updateIDArray(setFollowingsID, "remove");
    }
  };

  return (
    <div>
      {showMessage && (
        <ConfirmWindow
          setShowConfirm={setShowMessage}
          isConfirmWindow={false}
          messageToShow={messageToShow}
        />
      )}
      {showFriendProfile && (
        <FriendProfile
          setShowFriendProfile={setShowFriendProfile}
          profileCode={friendsID.includes(email) ? 1 : 2}
          friendEmail={email}
        />
      )}
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
                setAlertMessage(`you and ${userName} are not friends anymore`);
                setShowAlert(true);
              }}
            >
              Unfriend
            </button>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                updateFriends("friends", "remove");
                updateIDArray(setFriendsID, "remove");
                handleBlock(false);
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
                setAlertMessage(`friend request deleted successfully`);
                setShowAlert(true);
              }}
            >
              Cancel Request
            </button>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                updateFriends("friendRequestSend", "remove");
                updateIDArray(setReqSendID, "remove");
                handleBlock(false);
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
                setAlertMessage(`you and ${userName} are friends now`);
                setShowAlert(true);
              }}
            >
              Accept
            </button>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                updateFriends("friendRequestReceived", "remove");
                updateIDArray(setReqReceivedID, "remove");
                setAlertMessage("friend request declined");
                setShowAlert(true);
              }}
            >
              Decline
            </button>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                updateFriends("friendRequestReceived", "remove");
                updateIDArray(setReqReceivedID, "remove");
                handleBlock(false);
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
              onClick={() => {
                handleAddFriend(false);
              }}
            >
              Add friend
            </button>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                if (followingsID.includes(email)) {
                  updateFriends("followings", "remove");
                  updateIDArray(setFollowingsID, "remove");
                  setAlertMessage(`you have unfollowed ${userName}`);
                  setShowAlert(true);
                } else {
                  handleAddFriend(true);
                }
              }}
            >
              {followingsID.includes(email) ? "Unfollow" : "Follow"}
            </button>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                updateIDArray(setSuggessionsID, "remove");
                handleBlock(false);
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
                if (followingsID.includes(email)) {
                  updateFriends("followings", "remove");
                  updateIDArray(setFollowingsID, "remove");
                  setAlertMessage(`you have unfollowed ${userName}`);
                  setShowAlert(true);
                } else {
                  updateFriends("followings", "add");
                  updateIDArray(setFollowingsID, "add");
                  setAlertMessage(`you have followed ${userName}`);
                  setShowAlert(true);
                }
              }}
            >
              {followingsID.includes(email) ? "Unfollow" : "Follow"}
            </button>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                handleBlock(true);
              }}
            >
              Block
            </button>
          </>
        )}
        {selectedOption === 5 && (
          <>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                updateFriends("followings", "remove");
                updateIDArray(setFollowingsID, "remove");
                setAlertMessage(`you have unfollowed ${userName}`);
                setShowAlert(true);
              }}
            >
              Unfollow
            </button>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                handleBlock(true);
              }}
            >
              Block
            </button>
          </>
        )}
        {selectedOption === 6 && (
          <>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                updateFriends("blockList", "remove");
                updateIDArray(setBlockID, "remove");
                setAlertMessage(`${userName} is unblocked`);
                setShowAlert(true);
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
