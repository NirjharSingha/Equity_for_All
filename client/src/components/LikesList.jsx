import React from "react";
import "./LikesList.css";
import { useState, useEffect, useRef } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaLaughSquint, FaSadCry, FaAngry } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import ItemCard from "./ItemCard";

const LikesList = ({ setShowLikesList, likesData, total }) => {
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
        setShowLikesList(false);
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
            <ItemCard
              key={userEmail}
              containerClass="verticalContainerLine"
              imgClass="optionListImg"
              nameClass="optionListName"
              shouldDisplayImg={shouldDisplayUserImg[index]}
              imgSrc={userImg[index]}
              icon="/profilePicIcon.svg"
              name={userName[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default LikesList;
