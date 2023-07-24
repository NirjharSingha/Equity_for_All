import React from "react";
import "./Comment.css";
import { useEffect, useState, useRef } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { BiSolidSend } from "react-icons/bi";
import { TbReload } from "react-icons/tb";
import CommentCard from "./CommentCard";
import EmojiList from "./EmojiList";
import axios from "axios";
import jwtDecode from "jwt-decode";

const Comment = ({ setShowComments, post }) => {
  const commentContainerRef = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const emojiRef = useRef(null);
  const [comments, setComments] = useState([...post.comment].reverse());
  const [isRotating, setIsRotating] = useState(false);

  const handleRotateClick = async () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 500);

    try {
      const response = await axios.get(
        `http://localhost:5000/post/postOptions/getComments/${post._id}`
      );
      const getComments = response.data.comment.reverse();
      setComments(getComments);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleCommentSubmit = async () => {
    const decodedToken = jwtDecode(localStorage.getItem("token"));
    const commentID = `${Date.now()}${decodedToken.email}`;
    const sendData = {
      postId: post._id,
      commentID: commentID,
      commentDesc: commentInput,
      timeStamp: new Date(Date.now()).toLocaleString(),
      parentID: "",
      level: 0,
      levelParent: "",
      like: [],
      dislike: [],
      laugh: [],
      love: [],
      angry: [],
      sad: [],
      reply: [],
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
      setComments((prevComments) => [sendData, ...prevComments]);
      setCommentInput("");
    } catch (e) {
      console.log(e);
    }
  };

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
        <TbReload
          className={`commentReload rotating-element ${
            isRotating ? "rotate-once" : ""
          }`}
          onClick={handleRotateClick}
        />
        <button className="commentCross" onClick={() => setShowComments(false)}>
          X
        </button>
      </div>
      <div className="allComments">
        {comments.map((comment) => (
          <div key={comment.commentID}>
            <CommentCard
              key={comment.commentID}
              level={1}
              allComments={comments}
              setComments={setComments}
              comment={comment}
              postID={post._id}
            />
            {comment.reply.map((c) => (
              <div className="level_2" key={c.commentID}>
                <CommentCard
                  key={c.commentID}
                  level={2}
                  allComments={comments}
                  setComments={setComments}
                  comment={c}
                  postID={post._id}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="writeAComment">
        {showEmojis && (
          <div className="commentMainEmoji" ref={emojiRef}>
            {" "}
            <EmojiList setCommentInput={setCommentInput} />{" "}
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
          value={commentInput}
          onChange={(event) => setCommentInput(event.target.value)}
        />
        <BiSolidSend
          className={
            commentInput === ""
              ? "commentSubmitIconDisabled"
              : "commentSubmitIcon"
          }
          style={{ fontSize: "1.7rem" }}
          onClick={handleCommentSubmit}
        />
      </div>
    </div>
  );
};

export default Comment;
