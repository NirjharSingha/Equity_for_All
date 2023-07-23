import React from "react";
import { useEffect, useState, useRef } from "react";
import { AiOutlineLike, AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsFillReplyFill, BsEmojiSmile } from "react-icons/bs";
import { FaLaughSquint, FaSadCry, FaAngry, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BiSolidSend } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import EmojiList from "./EmojiList";
import AllLikes from "./AllLikes";
import "./CommentCard.css";
import axios from "axios";

const CommentCard = ({ level, allComments, setComments, comment, postID }) => {
  const [showReply, setShowReply] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [shouldDisplayAllLikes, setShouldDisplayAllLikes] = useState(false);
  const [mouseOnLike, setMouseOnLike] = useState(false);
  const [mouseOnAllLikes, setMouseOnAllLikes] = useState(false);
  const commentCardRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    console.log("Comment card loaded");

    const handleOutsideClick = (event) => {
      if (
        commentCardRef.current &&
        !commentCardRef.current.contains(event.target)
      ) {
        setShouldDisplayAllLikes(false);
        setMouseOnAllLikes(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (showReply) {
      inputRef.current.focus();
    }
  }, [showReply]);

  const handleEmojiClick = () => {
    setShowEmojis((prev) => !prev);
  };

  const handleMouseLeaveFromLike = () => {
    setTimeout(() => {
      setMouseOnLike(false);
    }, 500);
  };

  useEffect(() => {
    if (!mouseOnAllLikes && !mouseOnLike) {
      setShouldDisplayAllLikes(false);
    }
  }, [mouseOnAllLikes, mouseOnLike]);

  const handleCommentReply = async () => {
    const sendData = {
      postId: postID,
      commentDesc: inputValue,
      timeStamp: new Date(Date.now()).toLocaleString(),
      parentID: comment.commentID,
      level: 1,
      levelParent:
        comment.level === 0 ? comment.commentID : comment.levelParent,
    };
    try {
      console.log(sendData.level);
      const token = localStorage.getItem("token");
      console.log("sending req");
      const response = await axios.put(
        "http://localhost:5000/post/postOptions/createComment",
        sendData,
        {
          headers: {
            token: token,
          },
        }
      );
      if (level === 1) {
        const index = allComments.findIndex(
          (c) => c.commentID === comment.commentID
        );
        const updatedComments = [...allComments];
        updatedComments[index].reply.push(sendData);
        setComments(updatedComments);
      } else {
        const index = allComments.findIndex(
          (c) => c.commentID === comment.levelParent
        );
        const updatedComments = [...allComments];
        updatedComments[index].reply.push(sendData);
        setComments(updatedComments);
      }
      setInputValue("");
      setShowReply((prev) => !prev);
      setShowEmojis(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div ref={commentCardRef}>
      <div className="comment">
        <div className="commentFirstRow">
          <img
            src="http://localhost:5000/uploads/1688751295691-database.png"
            alt=""
            className="commentUserProfilePic"
          />
          <h3 className="commentUserName">User name</h3>
        </div>
        <div className="commentSecondRow">{comment.timeStamp}</div>
        <div className="commentThirdRow">
          <p>{comment.commentDesc}</p>
          <div
            className="commentLikes"
            onMouseEnter={() => {
              setMouseOnAllLikes(true);
            }}
            onMouseLeave={() => setMouseOnAllLikes(false)}
          >
            {selected === "" &&
              shouldDisplayAllLikes &&
              (mouseOnAllLikes || mouseOnLike) && (
                <div className="commentLikes">
                  <AllLikes
                    setSelected={setSelected}
                    setShouldDisplayAllLikes={setShouldDisplayAllLikes}
                    isCommentPage={true}
                  />
                </div>
              )}
          </div>
        </div>
        <div className="commentForthRow">
          <div
            className="commentLike"
            onMouseEnter={() => {
              setMouseOnLike(true);
              setShouldDisplayAllLikes(true);
            }}
            onMouseLeave={handleMouseLeaveFromLike}
            onClick={() => {
              setSelected("");
            }}
          >
            {selected === "like" ? (
              <AiFillLike className="commentIcons blue" />
            ) : selected === "dislike" ? (
              <AiFillDislike className="commentIcons blue" />
            ) : selected === "laugh" ? (
              <FaLaughSquint className="commentIcons yellow" />
            ) : selected === "angry" ? (
              <FaAngry className="commentIcons red" />
            ) : selected === "sad" ? (
              <FaSadCry className="commentIcons yellow" />
            ) : selected === "love" ? (
              <FcLike className="commentIcons" />
            ) : (
              <AiOutlineLike className="blue commentIcons" />
            )}
          </div>
          <BsFillReplyFill
            className="commentIcons blue"
            onClick={() => {
              setShowReply((prev) => !prev);
              setShowEmojis(false);
            }}
          />
          <FaEdit className="commentIcons blue" />
          <MdDelete className="commentIcons blue" />
        </div>
      </div>
      {showReply && (
        <div>
          {showEmojis && (
            <div className="emojiClass">
              <EmojiList setInputValue={setInputValue} />
            </div>
          )}

          <div className="commentFifthRow">
            <BsEmojiSmile
              className="commentEmojiIcon"
              onClick={handleEmojiClick}
            />
            <input
              type="text"
              className="commentReply"
              ref={inputRef}
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
            <BiSolidSend
              className={
                inputValue === ""
                  ? "commentSubmitIconDisabled"
                  : "commentSubmitIcon"
              }
              onClick={handleCommentReply}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
