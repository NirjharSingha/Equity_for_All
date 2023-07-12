import React from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaLaughSquint, FaSadCry, FaAngry } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import "./AllLikes.css";

const AllLikes = ({ setSelected, setShouldDisplayAllLikes }) => {
  return (
    <div className="allLikesContainer">
      <AiFillLike
        className="iconFlex blue"
        onClick={() => {
          setSelected("Like");
          setShouldDisplayAllLikes(false);
        }}
      />
      <AiFillDislike
        className="iconFlex blue"
        onClick={() => {
          setSelected("Dislike");
          setShouldDisplayAllLikes(false);
        }}
      />
      <FaLaughSquint
        className="iconFlex yellow"
        onClick={() => {
          setSelected("Laugh");
          setShouldDisplayAllLikes(false);
        }}
      />
      <FaAngry
        className="iconFlex red"
        onClick={() => {
          setSelected("Angry");
          setShouldDisplayAllLikes(false);
        }}
      />
      <FaSadCry
        className="iconFlex yellow"
        onClick={() => {
          setSelected("Sad");
          setShouldDisplayAllLikes(false);
        }}
      />
      <FcLike
        className="iconFlex"
        onClick={() => {
          setSelected("Love");
          setShouldDisplayAllLikes(false);
        }}
      />
    </div>
  );
};

export default AllLikes;
