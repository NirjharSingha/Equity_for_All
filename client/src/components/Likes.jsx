import React from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaLaughSquint, FaSadCry, FaAngry } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import "./Likes.css";

const AllLikes = ({ setSelected, setShouldDisplayAllLikes, isCommentPage }) => {
  return (
    <div className="allLikesContainer">
      <AiFillLike
        className="iconFlex likeHover blue"
        onClick={() => {
          setSelected("like");
          setShouldDisplayAllLikes(false);
        }}
        style={isCommentPage ? { fontSize: "1rem" } : {}}
      />
      <AiFillDislike
        className="iconFlex likeHover blue"
        onClick={() => {
          setSelected("dislike");
          setShouldDisplayAllLikes(false);
        }}
        style={isCommentPage ? { fontSize: "1rem" } : {}}
      />
      <FaLaughSquint
        className="iconFlex likeHover yellow"
        onClick={() => {
          setSelected("laugh");
          setShouldDisplayAllLikes(false);
        }}
        style={isCommentPage ? { fontSize: "1rem" } : {}}
      />
      <FaAngry
        className="iconFlex likeHover red"
        onClick={() => {
          setSelected("angry");
          setShouldDisplayAllLikes(false);
        }}
        style={isCommentPage ? { fontSize: "1rem" } : {}}
      />
      <FaSadCry
        className="iconFlex likeHover lightBlue"
        onClick={() => {
          setSelected("sad");
          setShouldDisplayAllLikes(false);
        }}
        style={isCommentPage ? { fontSize: "1rem" } : {}}
      />
      <FcLike
        className="iconFlex likeHover"
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
