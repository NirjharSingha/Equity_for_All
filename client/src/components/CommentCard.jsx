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

const CommentCard = () => {
  const [showReply, setShowReply] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [shouldDisplayAllLikes, setShouldDisplayAllLikes] = useState(false);
  const [mouseOnLike, setMouseOnLike] = useState(false);
  const [mouseOnAllLikes, setMouseOnAllLikes] = useState(false);
  const commentCardRef = useRef(null);

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
        <div className="commentSecondRow">
          {new Date(Date.now()).toLocaleString()}
        </div>
        <div className="commentThirdRow">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo
            optio laudantium error dolor consequatur facilis repellat, molestias
            quasi ut tenetur facere sapiente ipsam? Temporibus architecto quos
            iure quisquam at cupiditate nostrum quae? Ex nulla reprehenderit
            vitae facere amet sit fugit nobis ratione! Culpa temporibus eum
            molestias placeat delectus nobis illo!
          </p>
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
            {selected === "Like" ? (
              <AiFillLike className="commentIcons blue" />
            ) : selected === "Dislike" ? (
              <AiFillDislike className="commentIcons blue" />
            ) : selected === "Laugh" ? (
              <FaLaughSquint className="commentIcons yellow" />
            ) : selected === "Angry" ? (
              <FaAngry className="commentIcons red" />
            ) : selected === "Sad" ? (
              <FaSadCry className="commentIcons yellow" />
            ) : selected === "Love" ? (
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
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
            <BiSolidSend className="commentSubmitIcon" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
