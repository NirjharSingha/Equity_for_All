import React from "react";
import { useEffect, useState, useRef } from "react";
import { AiOutlineLike, AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsFillReplyFill, BsEmojiSmile } from "react-icons/bs";
import { FaLaughSquint, FaSadCry, FaAngry, FaEdit } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { BiSolidSend } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import EmojiList from "./EmojiList";
import AllLikes from "./Likes";
import "./CommentCard.css";
import axios from "axios";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { useLikesContext } from "../contexts/LikesContext";
import { useLikesListContext } from "../contexts/LikesListContext";
import LikesList from "./LikesList";
import jwtDecode from "jwt-decode";
import ConfirmWindow from "./ConfirmWindow";
import { useGlobals } from "../contexts/Globals";

const CommentCard = ({ comment, postID, level, allComments }) => {
  const { setIsValidJWT } = useGlobals();
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
  const { checkInitialMount, setUserLikes } = useLikesContext();
  const isInitialMount = useRef(true);
  const [showReplyComments, setShowReplyComments] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [likesData, setLikesData] = useState({
    like: comment.like,
    dislike: comment.dislike,
    laugh: comment.laugh,
    angry: comment.angry,
    sad: comment.sad,
    love: comment.love,
  });
  const [total, setTotal] = useState();
  const { loadLikesListData } = useLikesListContext();
  const [showLikesList, setShowLikesList] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setIsReply(false);
      setInputValue(comment.commentDesc);
    }
  }, [isEdit]);

  useEffect(() => {
    if (isReply) {
      setIsEdit(false);
      setInputValue("");
    }
  }, [isReply]);

  const handleDeleteComment = async () => {
    const sendData = {
      postID: postID,
      comment: comment,
      newDesc: "",
      deletedAt: new Date(Date.now()).toLocaleString(),
      editedAt: "",
    };
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${
          import.meta.env.VITE_SERVER_URL
        }/post/postOptions/editOrDeleteComment`,
        sendData,
        {
          headers: {
            token: token,
          },
        }
      );
    } catch (error) {
      console.log(error);
      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        console.log("inside status code");
        setIsValidJWT(false);
      }
    }
  };

  const handleLikePut = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/post/postOptions/commentLike`,
        {
          selectedLike: selectedLike,
          prevLike: prevSecLike,
          postID: postID,
          commentID: comment.commentID,
          level: comment.level,
          levelParent: comment.levelParent,
          higherParent: comment.higherParent,
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
    } catch (error) {
      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        console.log("inside status code");
        setIsValidJWT(false);
      }
    }
  };

  useEffect(() => {
    loadLikesListData(likesData, selectedLike, setLikesData, setTotal);
    checkInitialMount(isInitialMount, handleLikePut);
  }, [selectedLike]);

  useEffect(() => {
    setUserLikes(comment, setSelectedLike, setPrevSecLike);
    if (level === 0) {
      allComments = allComments.reverse();
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
    if (inputValue === "") {
      return;
    }
    if (isReply) {
      const decodedToken = jwtDecode(localStorage.getItem("token"));
      const userInfo = await getUserInfo(decodedToken.email);
      const { name, profilePic } = userInfo;
      const commentID = `${Date.now()}${decodedToken.email}`;

      const sendData = {
        postId: postID,
        commentID: commentID,
        userEmail: decodedToken.email,
        userName: name,
        profilePic: profilePic,
        commentDesc: inputValue,
        timeStamp: new Date(Date.now()).toLocaleString(),
        parentID: comment.commentID,
        parentName: comment.userName,
        level: comment.level === 3 ? comment.level : comment.level + 1,
        levelParent:
          comment.level === 0
            ? comment.commentID
            : comment.level === 1
            ? comment.commentID
            : comment.levelParent,
        higherParent:
          comment.level === 0
            ? ""
            : comment.level === 1
            ? comment.levelParent
            : comment.higherParent,
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
          `${import.meta.env.VITE_SERVER_URL}/post/postOptions/createComment`,
          sendData,
          {
            headers: {
              token: token,
            },
          }
        );
        if (response) {
          setInputValue("");
          setShowReply((prev) => !prev);
          setShowEmojis(false);
          setShowReplyComments(true);
          setIsReply(false);
        }
      } catch (error) {
        if (
          error.response.status === 401 &&
          error.response.statusText === "Unauthorized"
        ) {
          console.log("inside status code");
          setIsValidJWT(false);
        }
        console.log(error);
      }
    } else {
      const sendData = {
        postID: postID,
        comment: comment,
        newDesc: inputValue,
        editedAt: new Date(Date.now()).toLocaleString(),
        deletedAt: "",
      };
      try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
          `${
            import.meta.env.VITE_SERVER_URL
          }/post/postOptions/editOrDeleteComment`,
          sendData,
          {
            headers: {
              token: token,
            },
          }
        );
        if (response) {
          setInputValue("");
          setShowReply((prev) => !prev);
          setShowEmojis(false);
          setIsEdit(false);
        }
      } catch (error) {
        if (
          error.response.status === 401 &&
          error.response.statusText === "Unauthorized"
        ) {
          console.log("inside status code");
          setIsValidJWT(false);
        }
        console.log(error);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleCommentReply();
    }
  };

  return (
    <>
      {showConfirm && (
        <ConfirmWindow
          handleAction={handleDeleteComment}
          setShowConfirm={setShowConfirm}
          flag="comment"
          isConfirmWindow={true}
        />
      )}
      {showLikesList && (
        <LikesList
          setShowLikesList={setShowLikesList}
          likesData={likesData}
          total={total}
        />
      )}
      <div ref={commentCardRef}>
        <div className="comment">
          <div className="commentFirstRow">
            <div className="commentPicContainer">
              {comment.deletedAt === "" && comment.profilePic !== "" && (
                <img
                  src={comment.profilePic}
                  alt=""
                  className="commentUserProfilePic"
                />
              )}
              {comment.deletedAt === "" && comment.profilePic === "" && (
                <img
                  src="/profilePicIcon.svg" // Use the path to the SVG in the public folder
                  alt=""
                  className="commentUserProfilePic"
                />
              )}
              {comment.deletedAt !== "" && (
                <ImBlocked
                  className="commentUserProfilePic"
                  style={{ color: "red", background: "brown" }}
                />
              )}
            </div>
            <div
              className={
                comment.deletedAt === "" ? "commentUser" : "displayNone"
              }
            >
              <h3 className="commentUserName">{comment.userName}</h3>
              <div className="time">{comment.timeStamp}</div>
            </div>
          </div>
          <div className="commentSecondRow">
            {comment.deletedAt === "" ? (
              <p className="overFlowWrap">
                {" "}
                <span style={{ color: "blue" }}>
                  {" "}
                  {comment.parentName}{" "}
                </span>{" "}
                {` ${comment.commentDesc}`}
              </p>
            ) : (
              <p style={{ color: "red" }}>
                This comment is deleted by the owner
              </p>
            )}
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
          <div
            className={
              comment.deletedAt === "" ? "commentThirdRow" : "displayNone"
            }
          >
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
            {comment.userEmail ===
              jwtDecode(localStorage.getItem("token")).email && (
              <MdDelete
                className="commentIcons blue"
                onClick={() => setShowConfirm(true)}
              />
            )}
            {comment.userEmail ===
              jwtDecode(localStorage.getItem("token")).email && (
              <FaEdit
                className={isReply ? "displayNone" : "commentIcons blue"}
                onClick={() => {
                  setIsEdit((prev) => !prev);
                  setShowReply((prev) => !prev);
                  setShowEmojis(false);
                }}
              />
            )}
            <BsFillReplyFill
              className={isEdit ? "displayNone" : "commentIcons blue"}
              onClick={() => {
                setIsReply((prev) => !prev);
                setShowReply((prev) => !prev);
                setShowEmojis(false);
              }}
            />
          </div>
          <div className="commentFourthRow">
            <button
              className="commentButton"
              onClick={() => {
                setShowLikesList((prev) => !prev);
              }}
            >{`${total} reactions`}</button>
            {level === 0 && allComments.length > 0 && (
              <button
                className="commentButton"
                onClick={() => setShowReplyComments((prev) => !prev)}
              >
                {showReplyComments ? "Hide replies" : "Show replies"}
              </button>
            )}
            <div
              className={
                comment.deletedAt !== "" || comment.editedAt !== ""
                  ? "isEdited"
                  : "displayNone"
              }
            >
              {comment.deletedAt !== ""
                ? "deleted"
                : comment.editedAt !== ""
                ? "edited"
                : ""}
            </div>
          </div>
        </div>
        {showReply && (
          <div>
            {showEmojis && (
              <div className="emojiClass">
                <EmojiList setInputValue={setInputValue} inputRef={inputRef} />
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
                onKeyDown={handleKeyPress}
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
      {level === 0 &&
        allComments.map((c) => (
          <div
            className={
              level === 0 && !showReplyComments
                ? "level_1 displayNone"
                : "level_1"
            }
            key={c.commentID}
          >
            <CommentCard
              key={c.commentID}
              comment={c}
              postID={postID}
              allComments={c.reply}
              level={1}
            />
            {c.reply.map((x) => (
              <div className="level_2" key={x.commentID}>
                <CommentCard key={x.commentID} comment={x} postID={postID} />
              </div>
            ))}
          </div>
        ))}
    </>
  );
};

export default CommentCard;
