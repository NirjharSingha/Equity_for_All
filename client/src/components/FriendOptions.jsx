import React, { useState, useEffect, useContext } from "react";
import "./FriendOptions.css";
import {
  BsFillPersonPlusFill,
  BsFillPersonLinesFill,
  BsFillPersonFill,
  BsPersonFillSlash,
  BsPersonFillAdd,
  BsPersonFillDown,
} from "react-icons/bs";
import { FaUserFriends, FaBirthdayCake } from "react-icons/fa";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useFriendContext } from "../contexts/FriendContext";

const FriendOptions = () => {
  const {
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
  const [displayArray, setDisplayArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decodedToken = jwtDecode(localStorage.getItem("token"));
        const email = decodedToken.email;
        let flag;
        if (selectedOption === 0) {
          flag = "friends";
        }
        if (selectedOption === 1) {
          flag = "friendRequestSend";
        }
        if (selectedOption === 2) {
          flag = "friendRequestReceived";
        }
        if (selectedOption === 4) {
          flag = "followers";
        }
        if (selectedOption === 5) {
          flag = "followings";
        }
        if (selectedOption === 6) {
          flag = "friendsAndFollowers";
        }
        if (selectedOption === 7) {
          flag = "friendsAndFollowings";
        }
        if (selectedOption === 8) {
          flag = "blockList";
        }
        // const queryParams = new URLSearchParams({
        //   flag: flag,
        // });
        // const response = await axios.get(
        //   `http://localhost:5000/user/getFriends/${email}?${queryParams}`
        // );
        // if (response) {
        //   setDisplayArray(response.data);
        //   console.log(response);
        // }
        console.log(selectedOption);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedOption]);

  return (
    <div className="friendOptionsContainer">
      <div
        className={
          selectedOption === 0 ? "selectedFriendOption" : "friendOptionsButton"
        }
        onClick={() => setSelectedOption(0)}
      >
        <div className="friendIconContainer">
          <BsFillPersonLinesFill className="friendIcon" />
        </div>
        <p className="friendButtonText">All Friends</p>
        <p className="friendCount">{friendsID.length}</p>
      </div>
      <div
        className={
          selectedOption === 1 ? "selectedFriendOption" : "friendOptionsButton"
        }
        onClick={() => setSelectedOption(1)}
      >
        <div className="friendIconContainer">
          <BsPersonFillAdd className="friendIcon" />
        </div>
        <p className="friendButtonText">Request send</p>
        <p className="friendCount">{reqSendID.length}</p>
      </div>
      <div
        className={
          selectedOption === 2 ? "selectedFriendOption" : "friendOptionsButton"
        }
        onClick={() => setSelectedOption(2)}
      >
        <div className="friendIconContainer">
          <BsPersonFillDown className="friendIcon" />
        </div>
        <p className="friendButtonText">Request received</p>
        <p className="friendCount">{reqReceivedID.length}</p>
      </div>
      <div
        className={
          selectedOption === 3 ? "selectedFriendOption" : "friendOptionsButton"
        }
        onClick={() => setSelectedOption(3)}
      >
        <div className="friendIconContainer">
          <BsFillPersonPlusFill className="friendIcon" />
        </div>
        <p className="friendButtonText">Suggessions</p>
        <p className="friendCount">{suggessionsID.length}</p>
      </div>
      <div
        className={
          selectedOption === 4 ? "selectedFriendOption" : "friendOptionsButton"
        }
        onClick={() => setSelectedOption(4)}
      >
        <div className="friendIconContainer">
          <BsPersonFillSlash className="friendIcon" />
        </div>
        <p className="friendButtonText">Blocklist</p>
        <p className="friendCount">{blockID.length}</p>
      </div>
      <div
        className={
          selectedOption === 5 ? "selectedFriendOption" : "friendOptionsButton"
        }
        onClick={() => setSelectedOption(5)}
      >
        <div className="friendIconContainer">
          <FaBirthdayCake className="friendIcon" />
        </div>
        <p className="friendButtonText">Birthdays</p>
      </div>
    </div>
  );
};

export default FriendOptions;
