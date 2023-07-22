import React from "react";
import "./Comment.css";
import { useEffect, useState, useRef } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { BiSolidSend } from "react-icons/bi";
import CommentCard from "./CommentCard";
import EmojiList from "./EmojiList";
import axios from "axios";

const Comment = ({ setShowComments, post }) => {
  const commentContainerRef = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const emojiRef = useRef(null);
  const { comment } = post;

  const handleEmojiClick = () => {
    setShowEmojis((prev) => !prev);
  };

  const handleCommentSubmit = async () => {
    const sendData = {
      postId: post._id,
      commentDesc: inputValue,
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
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("Comment component loaded");
    console.log(post);

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
        {comment.map((c) => (
          <div key={c.commentID}>
            <CommentCard c={c} postID={post._id} />
            {c.reply.map((x) => (
              <div className="level_2" key={x.commentID}>
                <CommentCard c={x} postID={post._id} />
              </div>
            ))}
          </div>
        ))}
        {/* <div className="level_2">
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
        </div> */}
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
          onClick={handleCommentSubmit}
        />
      </div>
    </div>
  );
};

export default Comment;
