import React from "react";
import "./BirthDays.css";
import { useState, useEffect, useRef } from "react";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { useFriendContext } from "../contexts/FriendContext";

const BirthDays = () => {
  const listRef = useRef(null);
  const [listToDisplay, setListToDisplay] = useState([]);
  const { getUserInfo } = useUserInfoContext();
  const [userName, setUserName] = useState([]);
  const [userImg, setUserImg] = useState([]);
  const [shouldDisplayUserImg, setShouldDisplayUserImg] = useState([]);
  const [allMonths] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);

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
    followersID,
    setFollowersID,
    followingsID,
    setFollowingsID,
  } = useFriendContext();

  useEffect(() => {
    const fetchUserInformation = async () => {
      const newUserName = [];
      const newUserImg = [];
      const newShouldDisplayUserImg = [];

      for (const userEmail of listToDisplay) {
        const { name, profilePic } = await getUserInfo(userEmail);
        newUserName.push(name);
        newUserImg.push(profilePic);
        let flag = false;
        if (profilePic !== "") {
          flag = true;
        }
        newShouldDisplayUserImg.push(flag);
      }

      setUserName(newUserName);
      setUserImg(newUserImg);
      setShouldDisplayUserImg(newShouldDisplayUserImg);
    };

    fetchUserInformation();
  }, [listToDisplay]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setShowLikesList(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    setListToDisplay(reqSendID);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="birthDayContainer">
      {allMonths.map((month) => (
        <div className="monthContainer">
          <p className="monthName">{month}</p>
          <div className="listDisplay">
            {listToDisplay.map((userEmail, index) => (
              <div className="monthContainerLine" key={userEmail}>
                {shouldDisplayUserImg[index] && (
                  <img src={userImg[index]} alt="" className="birthdayImg" />
                )}
                {!shouldDisplayUserImg[index] && (
                  <svg
                    id="logo-15"
                    width="2.5rem"
                    height="2.5rem"
                    viewBox="0 0 49 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="birthdayImg"
                  >
                    {" "}
                    <path
                      d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z"
                      className="ccustom"
                      fill="#17CF97"
                    ></path>{" "}
                    <path
                      d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z"
                      className="ccustom"
                      fill="#17CF97"
                    ></path>{" "}
                    <path
                      d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z"
                      className="ccustom"
                      fill="#17CF97"
                    ></path>{" "}
                    <path
                      d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z"
                      className="ccustom"
                      fill="#17CF97"
                    ></path>{" "}
                  </svg>
                )}
                <p className="birthDayListName">{userName[index]}</p>
                <p className="birthDate">13</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default BirthDays;
