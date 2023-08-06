import React from "react";
import "./OptionList.css";
import { useState, useEffect, useRef } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaLaughSquint, FaSadCry, FaAngry } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { useUserInfoContext } from "../contexts/UserInfoContext";

const OptionList = ({ setShowOptionList, likesData, total }) => {
  const [horizontalItems, setHorizontalItems] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const listRef = useRef(null);
  const [listToDisplay, setListToDisplay] = useState([]);
  const { getUserInfo } = useUserInfoContext();
  const [userName, setUserName] = useState([]);
  const [userImg, setUserImg] = useState([]);
  const [shouldDisplayUserImg, setShouldDisplayUserImg] = useState([]);

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
    console.log("optionList component loaded");
    setHorizontalItems([
      AiFillLike,
      AiFillDislike,
      FaLaughSquint,
      FaAngry,
      FaSadCry,
      FcLike,
    ]);

    const handleOutsideClick = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setShowOptionList(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    console.log(selectedItemIndex);
    let list = [];
    if (selectedItemIndex === 0) {
      list = list.concat(
        likesData.like,
        likesData.dislike,
        likesData.laugh,
        likesData.angry,
        likesData.sad,
        likesData.love
      );
    } else if (selectedItemIndex === 1) {
      list = list.concat(likesData.like);
    } else if (selectedItemIndex === 2) {
      list = list.concat(likesData.dislike);
    } else if (selectedItemIndex === 3) {
      list = list.concat(likesData.laugh);
    } else if (selectedItemIndex === 4) {
      list = list.concat(likesData.angry);
    } else if (selectedItemIndex === 5) {
      list = list.concat(likesData.sad);
    } else if (selectedItemIndex === 6) {
      list = list.concat(likesData.love);
    }
    setListToDisplay(list);
    console.log(listToDisplay);
  }, [selectedItemIndex]);

  const getClassBasedOnIndex = (index) => {
    if (index === 0 || index === 1) {
      return "blue";
    } else if (index === 2) {
      return "yellow";
    } else if (index === 3) {
      return "red";
    } else if (index === 4) {
      return "lightBlue";
    }
  };

  const getReactionCount = (index) => {
    let count;
    count =
      index === 0
        ? likesData.like.length
        : index === 1
        ? likesData.dislike.length
        : index === 2
        ? likesData.laugh.length
        : index === 3
        ? likesData.angry.length
        : index === 4
        ? likesData.sad.length
        : likesData.love.length;
    return count;
  };

  return (
    <div className="outerBlurContainer">
      <div className="optionListContainer" ref={listRef}>
        <div className="horizontalBar">
          <div
            className={`horizontalItemContainer ${
              selectedItemIndex === 0 ? "selectedItem" : ""
            }`}
            onClick={() => setSelectedItemIndex(0)}
          >
            <p className={`horizontalIcon`} style={{ fontSize: "1.3rem" }}>
              All
            </p>
            <p>{total}</p>
          </div>
          {horizontalItems.map((IconComponent, index) => (
            <div
              key={index}
              className={`horizontalItemContainer ${
                selectedItemIndex === index + 1 ? "selectedItem" : ""
              }`}
              onClick={() => setSelectedItemIndex(index + 1)}
            >
              <IconComponent
                className={`horizontalIcon ${getClassBasedOnIndex(index)}`}
              />
              <p>{getReactionCount(index)}</p>
            </div>
          ))}
        </div>
        <div className="verticalContainer">
          {listToDisplay.map((userEmail, index) => (
            <div className="verticalContainerLine" key={userEmail}>
              {shouldDisplayUserImg[index] && (
                <img src={userImg[index]} alt="" className="optionListImg" />
              )}
              {!shouldDisplayUserImg[index] && (
                <svg
                  id="logo-15"
                  width="2rem"
                  height="2rem"
                  viewBox="0 0 49 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="optionListImg"
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
              <p className="optionListName">{userName[index]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default OptionList;
