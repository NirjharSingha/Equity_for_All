import React from "react";
import "./Comment.css";
import { useEffect, useState, useRef } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BsFillReplyFill, BsEmojiSmile } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BiSolidSend } from "react-icons/bi";
import CommentCard from "./CommentCard";
import EmojiList from "./EmojiList";

const Comment = ({ setShowComments }) => {
  const commentContainerRef = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const emojiRef = useRef(null);

  const handleEmojiClick = () => {
    setShowEmojis((prev) => !prev);
  };

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

  useEffect(() => {
    console.log("Comment card loaded");

    const handleOutsideClick = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmojis(false);
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
        {showEmojis && (
          <div className="commentMainEmoji" ref={emojiRef}>
            {" "}
            <EmojiList setInputValue={setInputValue} />{" "}
          </div>
        )}
        <BsEmojiSmile
          className="commentEmojiIcon"
          style={{ fontSize: "1.7rem" }}
          onClick={handleEmojiClick}
        />
        <input
          type="text"
          className="commentReply"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <BiSolidSend
          className="commentSubmitIcon"
          style={{ fontSize: "1.7rem" }}
        />
      </div>
    </div>
  );
};

export default Comment;
