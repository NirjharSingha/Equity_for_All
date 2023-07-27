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
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { useVerifyFileContext } from "../contexts/VerifyFileContext";
import jwtDecode from "jwt-decode";

const CommentCard = ({ level, comment, postID }) => {
  const [showReply, setShowReply] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedLike, setSelectedLike] = useState("");
  const [prevSecLike, setPrevSecLike] = useState("");
  const [shouldDisplayAllLikes, setShouldDisplayAllLikes] = useState(false);
  const [mouseOnLike, setMouseOnLike] = useState(false);
  const [mouseOnAllLikes, setMouseOnAllLikes] = useState(false);
  const commentCardRef = useRef(null);
  const inputRef = useRef(null);
  const { getUserInfo } = useUserInfoContext();
  const { isFileExists } = useVerifyFileContext();
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");
  const [shouldDisplayUserImg, setShouldDisplayUserImg] = useState(false);
  const isInitialMount = useRef(true);

  const handleLikePut = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      "http://localhost:5000/post/postOptions/commentLike",
      {
        selectedLike: selectedLike,
        prevLike: prevSecLike,
        postID: postID,
        commentID: comment.commentID,
        level: comment.level,
        levelParent:
          comment.level === 0 ? comment.commentID : comment.levelParent,
      },
      {
        headers: {
          token: token,
        },
      }
    );
    if (response.status == 200) {
      setPrevSecLike(selectedLike);
    }
  };

  useEffect(() => {
    // Skip the API call on initial mount
    if (!isInitialMount.current) {
      console.log("on initial mount");
      handleLikePut();
    } else {
      isInitialMount.current = false;
      console.log("skipped");
    }
  }, [selectedLike]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (comment.userEmail) {
          const userInfo = await getUserInfo(comment.userEmail);
          const { name, profilePic } = userInfo;
          const baseUrl = "http://localhost:5000/";
          const imgVerify = await isFileExists(
            profilePic.substring(baseUrl.length)
          );
          if (profilePic !== "" && imgVerify.data.exists) {
            setShouldDisplayUserImg(true);
          }
          setUserName(name);
          setUserImg(profilePic);
        } else {
          console.error("comment.userEmail is undefined");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
    const decodedToken = jwtDecode(localStorage.getItem("token"));
    const email = decodedToken.email;
    console.log(comment);
    if (Array.isArray(comment.like) && comment.like.includes(email)) {
      setSelectedLike("like");
      setPrevSecLike("like");
    } else if (
      Array.isArray(comment.dislike) &&
      comment.dislike.includes(email)
    ) {
      setSelectedLike("dislike");
      setPrevSecLike("dislike");
    } else if (Array.isArray(comment.laugh) && comment.laugh.includes(email)) {
      setSelectedLike("laugh");
      setPrevSecLike("laugh");
    } else if (Array.isArray(comment.love) && comment.love.includes(email)) {
      setSelectedLike("love");
      setPrevSecLike("love");
    } else if (Array.isArray(comment.like) && comment.sad.includes(email)) {
      setSelectedLike("sad");
      setPrevSecLike("sad");
    } else if (Array.isArray(comment.angry) && comment.angry.includes(email)) {
      setSelectedLike("angry");
      setPrevSecLike("angry");
    } else {
      setSelectedLike("");
      setPrevSecLike("");
    }
  }, []);

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
    const decodedToken = jwtDecode(localStorage.getItem("token"));
    const commentID = `${Date.now()}${decodedToken.email}`;
    const sendData = {
      postId: postID,
      commentID: commentID,
      userEmail: decodedToken.email,
      commentDesc: inputValue,
      timeStamp: new Date(Date.now()).toLocaleString(),
      parentID: comment.commentID,
      level: level,
      levelParent:
        comment.level === 0 ? comment.commentID : comment.levelParent,
      like: [],
      dislike: [],
      laugh: [],
      love: [],
      angry: [],
      sad: [],
      reply: [],
      helperComment: comment,
    };
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/post/postOptions/createComment",
        sendData,
        {
          headers: {
            token: token,
          },
        }
      );
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
          {shouldDisplayUserImg && (
            <img src={userImg} alt="" className="commentUserProfilePic" />
          )}
          {!shouldDisplayUserImg && (
            <svg
              id="logo-15"
              width="2rem"
              height="2rem"
              viewBox="0 0 49 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
          <h3 className="commentUserName">{userName}</h3>
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
            {selectedLike === "" &&
              shouldDisplayAllLikes &&
              (mouseOnAllLikes || mouseOnLike) && (
                <div className="commentLikes">
                  <AllLikes
                    setSelected={setSelectedLike}
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
              setSelectedLike("");
            }}
          >
            {selectedLike === "like" ? (
              <AiFillLike className="commentIcons blue" />
            ) : selectedLike === "dislike" ? (
              <AiFillDislike className="commentIcons blue" />
            ) : selectedLike === "laugh" ? (
              <FaLaughSquint className="commentIcons yellow" />
            ) : selectedLike === "angry" ? (
              <FaAngry className="commentIcons red" />
            ) : selectedLike === "sad" ? (
              <FaSadCry className="commentIcons yellow" />
            ) : selectedLike === "love" ? (
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
