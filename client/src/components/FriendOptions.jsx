import React from "react";
import "./FriendOptions.css";
import {
  BsFillPersonPlusFill,
  BsFillPersonLinesFill,
  BsFillPersonFill,
  BsPersonFillSlash,
  BsPersonFillAdd,
  BsPersonFillDown,
} from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";
import { useFriendContext } from "../contexts/FriendContext";

const FriendOptions = () => {
  const {
    friendsID,
    selectedOption,
    setSelectedOption,
    reqReceivedID,
    blockID,
    reqSendID,
    suggessionsID,
    followersID,
    followingsID,
  } = useFriendContext();

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
          <BsFillPersonFill className="friendIcon" />
        </div>
        <p className="friendButtonText">Followers</p>
        <p className="friendCount">
          {followersID !== undefined ? followersID.length : 0}
        </p>
      </div>
      <div
        className={
          selectedOption === 5 ? "selectedFriendOption" : "friendOptionsButton"
        }
        onClick={() => setSelectedOption(5)}
      >
        <div className="friendIconContainer">
          <BsFillPersonFill className="friendIcon" />
        </div>
        <p className="friendButtonText">Followings</p>
        <p className="friendCount">
          {followingsID !== undefined ? followingsID.length : 0}
        </p>
      </div>
      <div
        className={
          selectedOption === 6 ? "selectedFriendOption" : "friendOptionsButton"
        }
        onClick={() => setSelectedOption(6)}
      >
        <div className="friendIconContainer">
          <BsPersonFillSlash className="friendIcon" />
        </div>
        <p className="friendButtonText">Blocklist</p>
        <p className="friendCount">{blockID.length}</p>
      </div>
      <div
        className={
          selectedOption === 7 ? "selectedFriendOption" : "friendOptionsButton"
        }
        onClick={() => setSelectedOption(7)}
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
