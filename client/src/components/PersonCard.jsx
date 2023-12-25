import React from "react";
import { useState, useEffect } from "react";
import FriendProfile from "./FriendProfile";
import "./PersonCard.css";
import { useFriendContext } from "../contexts/FriendContext";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import axios from "axios";
import ConfirmWindow from "./ConfirmWindow";
import { useGlobals } from "../contexts/Globals";

const PersonCard = ({ email }) => {
  const { setIsValidJWT } = useGlobals();
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
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");
  const [mutualFriends, setMutualFriends] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [messageToShow, setMessageToShow] = useState("");
  const [showFriendProfile, setShowFriendProfile] = useState(false);

  useEffect(() => {
    const displayPerson = async () => {
      const { name, profilePic } = await getUserInfo(email);
      setUserName(name), setUserImg(profilePic);
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
        if (error.response.status === 401) {
          console.log("inside status code");
          setIsValidJWT(false);
        }
        console.log(error);
      }
    };

    displayPerson();
    countMutualFriends();
    console.log("person card loaded");
  }, []);

  const updateFriends = async (option, action, num) => {
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
        if (num === 1) {
          func_1();
        }
        if (num === 2) {
          func_2();
        }
        if (num === 3) {
          func_3();
        }
        if (num === 4) {
          func_4();
        }
        if (num === 5) {
          func_5();
        }
        if (num === 6) {
          func_6();
        }
        if (num === 7) {
          func_7();
        }
        if (num === 8) {
          func_8();
        }
        if (num === 9) {
          func_9();
        }
        if (num === 10) {
          func_10();
        }
        if (num === 11) {
          func_11();
        }
        if (num === 12) {
          func_12();
        }
        if (num === 101) {
          func_101();
        }
        if (num === 102) {
          func_102();
        }
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.log("inside status code");
        setIsValidJWT(false);
      }
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
      if (error.response.status === 401) {
        console.log("inside status code");
        setIsValidJWT(false);
      }
      console.log(error);
    }
  };

  const handleBlock = async (isFollowPage) => {
    if (isFollowPage) {
      updateFriends("followers", "remove");
      updateFriends("followings", "remove");
      updateFriends("friends", "remove");
      updateFriends("friendRequestSend", "remove");
      updateFriends("friendRequestReceived", "remove");
      updateFriends("blockList", "add", 101);
    } else {
      updateFriends("blockList", "add");
      updateFriends("followers", "remove");
      updateFriends("followings", "remove", 102);
    }
  };

  const func_1 = () => {
    updateIDArray(setFriendsID, "remove");
    setAlertMessage(`you and ${userName} are not friends anymore`);
    setShowAlert(true);
  };

  const func_2 = () => {
    updateIDArray(setFriendsID, "remove");
    handleBlock(false);
  };

  const func_3 = () => {
    updateIDArray(setReqSendID, "remove");
    setAlertMessage(`friend request deleted successfully`);
    setShowAlert(true);
  };

  const func_4 = () => {
    updateIDArray(setReqSendID, "remove");
    handleBlock(false);
  };

  const func_5 = () => {
    updateIDArray(setReqReceivedID, "remove");
    updateFriends("friends", "add");
    updateIDArray(setFriendsID, "add");
    setAlertMessage(`you and ${userName} are friends now`);
    setShowAlert(true);
  };

  const func_6 = () => {
    updateIDArray(setReqReceivedID, "remove");
    setAlertMessage("friend request declined");
    setShowAlert(true);
  };

  const func_7 = () => {
    updateIDArray(setReqReceivedID, "remove");
    handleBlock(false);
  };

  const func_8 = () => {
    updateIDArray(setFollowingsID, "remove");
    setAlertMessage(`you have unfollowed ${userName}`);
    setShowAlert(true);
  };

  const func_9 = () => {
    updateIDArray(setFollowingsID, "remove");
    setAlertMessage(`you have unfollowed ${userName}`);
    setShowAlert(true);
  };

  const func_10 = () => {
    updateIDArray(setFollowingsID, "add");
    setAlertMessage(`you have followed ${userName}`);
    setShowAlert(true);
  };

  const func_11 = () => {
    updateIDArray(setFollowingsID, "remove");
    setAlertMessage(`you have unfollowed ${userName}`);
    setShowAlert(true);
  };

  const func_12 = () => {
    updateIDArray(setBlockID, "remove");
    setAlertMessage(`${userName} is unblocked`);
    setShowAlert(true);
  };

  const func_101 = () => {
    updateIDArray(setFollowersID, "remove");
    updateIDArray(setFollowingsID, "remove");
    updateIDArray(setFriendsID, "remove");
    updateIDArray(setReqSendID, "remove");
    updateIDArray(setReqReceivedID, "remove");
    updateIDArray(setSuggessionsID, "remove");
    updateIDArray(setBlockID, "add");
    setAlertMessage(`${userName} is blocked`);
    setShowAlert(true);
  };

  const func_102 = () => {
    updateIDArray(setBlockID, "add");
    updateIDArray(setFollowersID, "remove");
    updateIDArray(setFollowingsID, "remove");
    setAlertMessage(`${userName} is blocked`);
    setShowAlert(true);
    if (selectedOption === 3) {
      updateIDArray(setSuggessionsID, "remove");
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
          {userImg !== "" && <img src={userImg} alt="" className="personImg" />}
        </div>
        <p className="personName">{userName}</p>
        <p className="personText">{mutualFriends} mutual friends</p>
        {selectedOption === 0 && (
          <>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                updateFriends("friends", "remove", 1);
              }}
            >
              Unfriend
            </button>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                updateFriends("friends", "remove", 2);
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
                updateFriends("friendRequestSend", "remove", 3);
              }}
            >
              Cancel Request
            </button>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                updateFriends("friendRequestSend", "remove", 4);
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
                updateFriends("friendRequestReceived", "remove", 5);
              }}
            >
              Accept
            </button>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                updateFriends("friendRequestReceived", "remove", 6);
              }}
            >
              Decline
            </button>
            <button
              className="personCardButton personCardElement"
              onClick={() => {
                updateFriends("friendRequestReceived", "remove", 7);
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
                  updateFriends("followings", "remove", 8);
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
                  updateFriends("followings", "remove", 9);
                } else {
                  updateFriends("followings", "add", 10);
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
                updateFriends("followings", "remove", 11);
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
                updateFriends("blockList", "remove", 12);
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
