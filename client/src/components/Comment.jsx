import React from "react";
import "./Comment.css";
import { useEffect, useState, useRef } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BsFillReplyFill, BsEmojiSmile } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BiSolidSend } from "react-icons/bi";
import CommentCard from "./CommentCard";

const Comment = ({ setShowComments }) => {
  const commentContainerRef = useRef(null);

  useEffect(() => {
    console.log("Comment component loaded");

    const handleOutsideClick = (event) => {
      if (
        commentContainerRef.current &&
        !commentContainerRef.current.contains(event.target)
      ) {
        setShowComments(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="commentContainer" ref={commentContainerRef}>
      <div className="commentCrossContainer">
        <button className="commentCross" onClick={() => setShowComments(false)}>
          X
        </button>
      </div>
      <div className="allComments">
        <CommentCard />
        <div className="level_2">
          <CommentCard />
        </div>
        <div className="level_3">
          <CommentCard />
        </div>
        <CommentCard />
        <div className="level_2">
          <CommentCard />
        </div>
        <div className="level_3">
          <CommentCard />
        </div>
        <CommentCard />
        <div className="level_2">
          <CommentCard />
        </div>
        <div className="level_3">
          <CommentCard />
        </div>
      </div>
      <div className="writeAComment">
        <BsEmojiSmile
          className="commentEmojiIcon"
          style={{ fontSize: "1.7rem" }}
        />
        <input type="text" className="commentReply" />
        <BiSolidSend
          className="commentSubmitIcon"
          style={{ fontSize: "1.7rem" }}
        />
      </div>
    </div>
  );
};

export default Comment;
