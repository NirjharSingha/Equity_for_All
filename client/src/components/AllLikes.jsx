import React from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaLaughSquint, FaSadCry, FaAngry } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import "./AllLikes.css";

const AllLikes = ({ setSelected, setShouldDisplayAllLikes, isCommentPage }) => {
  return (
    <div className="allLikesContainer">
      <AiFillLike
        className="iconFlex blue"
        onClick={() => {
          setSelected("Like");
          setShouldDisplayAllLikes(false);
        }}
        style={isCommentPage ? { fontSize: "1rem" } : {}}
      />
      <AiFillDislike
        className="iconFlex blue"
        onClick={() => {
          setSelected("Dislike");
          setShouldDisplayAllLikes(false);
        }}
        style={isCommentPage ? { fontSize: "1rem" } : {}}
      />
      <FaLaughSquint
        className="iconFlex yellow"
        onClick={() => {
          setSelected("Laugh");
          setShouldDisplayAllLikes(false);
        }}
        style={isCommentPage ? { fontSize: "1rem" } : {}}
      />
      <FaAngry
        className="iconFlex red"
        onClick={() => {
          setSelected("Angry");
          setShouldDisplayAllLikes(false);
        }}
        style={isCommentPage ? { fontSize: "1rem" } : {}}
      />
      <FaSadCry
        className="iconFlex yellow"
        onClick={() => {
          setSelected("Sad");
          setShouldDisplayAllLikes(false);
        }}
        style={isCommentPage ? { fontSize: "1rem" } : {}}
      />
      <FcLike
        className="iconFlex"
        onClick={() => {
          setSelected("Love");
          setShouldDisplayAllLikes(false);
        }}
        style={isCommentPage ? { fontSize: "1rem" } : {}}
      />
    </div>
  );
};

export default AllLikes;
