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
          setSelected("like");
          setShouldDisplayAllLikes(false);
        }}
        style={isCommentPage ? { fontSize: "1rem" } : {}}
      />
      <AiFillDislike
        className="iconFlex blue"
        onClick={() => {
          setSelected("dislike");
          setShouldDisplayAllLikes(false);
        }}
        style={isCommentPage ? { fontSize: "1rem" } : {}}
      />
      <FaLaughSquint
        className="iconFlex yellow"
        onClick={() => {
          setSelected("laugh");
          setShouldDisplayAllLikes(false);
        }}
        style={isCommentPage ? { fontSize: "1rem" } : {}}
      />
      <FaAngry
        className="iconFlex red"
        onClick={() => {
          setSelected("angry");
          setShouldDisplayAllLikes(false);
        }}
        style={isCommentPage ? { fontSize: "1rem" } : {}}
      />
      <FaSadCry
        className="iconFlex lightBlue"
        onClick={() => {
          setSelected("sad");
          setShouldDisplayAllLikes(false);
        }}
        style={isCommentPage ? { fontSize: "1rem" } : {}}
      />
      <FcLike
        className="iconFlex"
        onClick={() => {
          setSelected("love");
          setShouldDisplayAllLikes(false);
        }}
        style={isCommentPage ? { fontSize: "1rem" } : {}}
      />
    </div>
  );
};

export default AllLikes;
