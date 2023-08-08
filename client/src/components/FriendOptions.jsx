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
import { FaUserFriends, FaBirthdayCake } from "react-icons/fa";

const FriendOptions = () => {
  return (
    <div className="friendOptionsContainer">
      <div className="friendOptionsButton">
        <div className="friendIconContainer">
          <BsFillPersonLinesFill className="friendIcon" />
        </div>
        <p className="friendButtonText">All Friends</p>
        <p className="friendCount">999K+</p>
      </div>
      <div className="friendOptionsButton">
        <div className="friendIconContainer">
          <BsPersonFillAdd className="friendIcon" />
        </div>
        <p className="friendButtonText">Friend request send</p>
        <p className="friendCount">999K+</p>
      </div>
      <div className="friendOptionsButton">
        <div className="friendIconContainer">
          <BsPersonFillDown className="friendIcon" />
        </div>
        <p className="friendButtonText">Friend request received</p>
        <p className="friendCount">999K+</p>
      </div>
      <div className="friendOptionsButton">
        <div className="friendIconContainer">
          <BsFillPersonPlusFill className="friendIcon" />
        </div>
        <p className="friendButtonText">Suggessions</p>
        <p className="friendCount">999K+</p>
      </div>
      <div className="friendOptionsButton">
        <div className="friendIconContainer">
          <BsFillPersonFill className="friendIcon" />
        </div>
        <p className="friendButtonText">Followers</p>
        <p className="friendCount">999K+</p>
      </div>
      <div className="friendOptionsButton">
        <div className="friendIconContainer">
          <BsFillPersonFill className="friendIcon" />
        </div>
        <p className="friendButtonText">Followings</p>
        <p className="friendCount">999K+</p>
      </div>
      <div className="friendOptionsButton">
        <div className="friendIconContainer">
          <FaUserFriends className="friendIcon" />
        </div>
        <p className="friendButtonText">Friends & Followers</p>
        <p className="friendCount">999K+</p>
      </div>
      <div className="friendOptionsButton">
        <div className="friendIconContainer">
          <FaUserFriends className="friendIcon" />
        </div>
        <p className="friendButtonText">Friends & Followings</p>
        <p className="friendCount">999K+</p>
      </div>
      <div className="friendOptionsButton">
        <div className="friendIconContainer">
          <BsPersonFillSlash className="friendIcon" />
        </div>
        <p className="friendButtonText">Blocklist</p>
        <p className="friendCount">999K+</p>
      </div>
      <div className="friendOptionsButton">
        <div className="friendIconContainer">
          <FaBirthdayCake className="friendIcon" />
        </div>
        <p className="friendButtonText">Birthdays</p>
      </div>
    </div>
  );
};

export default FriendOptions;
