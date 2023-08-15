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
import { useUserInfoContext } from "../contexts/UserInfoContext";

const Comment = ({ setShowComments, post }) => {
  const commentContainerRef = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const emojiRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [isRotating, setIsRotating] = useState(false);
  const { getUserInfo } = useUserInfoContext();
  const [commentPage, setCommentPage] = useState(0);
  const [commentLimit] = useState(3);
  const [commentIds, setCommentIds] = useState([]);

  const handleRotateClick = async () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
  };

  const handleSSEData = (event) => {
    handleRotateClick();

    const data = JSON.parse(event.data);

    if (data.createFlag) {
      if (data.level === 0) {
        setComments((prevComments) => [data, ...prevComments]);
      } else if (data.level === 1) {
        setComments((prevComments) =>
          prevComments.map((c) =>
            c.commentID === data.helperComment.commentID
              ? { ...c, reply: [data, ...c.reply] }
              : c
          )
        );
      } else if (data.level === 2) {
        setComments((prevComments) => {
          const updatedComments = prevComments.map((comment) => {
            if (comment.commentID === data.helperComment.levelParent) {
              return {
                ...comment,
                reply: comment.reply.map((reply) =>
                  reply.commentID === data.helperComment.commentID
                    ? {
                        ...reply,
                        reply: [...reply.reply, data],
                      }
                    : reply
                ),
              };
            }
            return comment;
          });
          return updatedComments;
        });
      } else {
        setComments((prevComments) => {
          const updatedComments = prevComments.map((comment) => {
            if (comment.commentID === data.helperComment.higherParent) {
              return {
                ...comment,
                reply: comment.reply.map((reply) =>
                  reply.commentID === data.helperComment.levelParent
                    ? {
                        ...reply,
                        reply: [...reply.reply, data],
                      }
                    : reply
                ),
              };
            }
            return comment;
          });
          return updatedComments;
        });
      }
    } else {
      setComments((prevComments) => {
        if (data.comment.level === 0) {
          return prevComments.map((comment) =>
            comment.commentID === data.comment.commentID
              ? {
                  ...comment,
                  commentDesc: data.newDesc,
                  editedAt: data.editedAt,
                  deletedAt: data.deletedAt,
                }
              : comment
          );
        } else if (data.comment.level === 1) {
          return prevComments.map((comment) =>
            comment.commentID === data.comment.levelParent
              ? {
                  ...comment,
                  reply: comment.reply.map((reply) =>
                    reply.commentID === data.comment.commentID
                      ? {
                          ...reply,
                          commentDesc: data.newDesc,
                          editedAt: data.editedAt,
                          deletedAt: data.deletedAt,
                        }
                      : reply
                  ),
                }
              : comment
          );
        } else {
          return prevComments.map((comment) =>
            comment.commentID === data.comment.higherParent
              ? {
                  ...comment,
                  reply: comment.reply.map((reply) =>
                    reply.commentID === data.comment.levelParent
                      ? {
                          ...reply,
                          reply: reply.reply.map((nestedReply) =>
                            nestedReply.commentID === data.comment.commentID
                              ? {
                                  ...nestedReply,
                                  commentDesc: data.newDesc,
                                  editedAt: data.editedAt,
                                  deletedAt: data.deletedAt,
                                }
                              : nestedReply
                          ),
                        }
                      : reply
                  ),
                }
              : comment
          );
        }
      });
    }
  };

  useEffect(() => {
    const fetchCommentIds = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/post/postOptions/getCommentIds/${post._id}`,
          {
            headers: {
              token: token,
            },
          }
        );
        setCommentIds(response.data.commentID.reverse());
      } catch (error) {
        console.error("Error fetching comment count:", error);
      }
    };

    fetchCommentIds();

    const eventSource = new EventSource("http://localhost:5000/api/commentSSE");

    eventSource.addEventListener("message", handleSSEData);

    return () => {
      eventSource.removeEventListener("message", handleSSEData);
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    const fetchAllComments = async () => {
      let arrayToSend = [];
      if (
        commentIds.length > 0 &&
        commentPage * commentLimit <= commentIds.length
      ) {
        console.log(commentPage);
        for (
          let index = commentPage * commentLimit;
          index < commentIds.length &&
          index < commentPage * commentLimit + commentLimit;
          index++
        ) {
          const element = commentIds[index];
          arrayToSend.push(element);
        }
      }
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/post/postOptions/getComments/${post._id}?ids=${arrayToSend}`,
          {
            headers: {
              token: token,
            },
          }
        );
        const getComments = response.data;
        setComments((prev) => [...prev, ...getComments]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    if (commentIds.length > 0) {
      console.log(commentIds);
      fetchAllComments();
    }
  }, [commentIds, commentPage]);

  const handleCommentSubmit = async () => {
    if (commentInput === "") {
      return;
    }
    const decodedToken = jwtDecode(localStorage.getItem("token"));
    const userInfo = await getUserInfo(decodedToken.email);
    const { name, profilePic } = userInfo;
    const commentID = `${Date.now()}${decodedToken.email}`;
    const sendData = {
      postId: post._id,
      commentID: commentID,
      userEmail: decodedToken.email,
      userName: name,
      profilePic: profilePic,
      commentDesc: commentInput,
      timeStamp: new Date(Date.now()).toLocaleString(),
      parentID: "",
      parentName: "",
      level: 0,
      levelParent: "",
      higherParent: "",
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
      setCommentInput("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleEmojiClick = () => {
    setShowEmojis((prev) => !prev);
  };

  useEffect(() => {
    console.log("comment component loaded");
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

  const handleViewComment = () => {
    setCommentPage((prev) => prev + 1);
  };

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
              comment={comment}
              postID={post._id}
              allComments={comment.reply}
              level={0}
            />
          </div>
        ))}
        {(commentPage + 1) * commentLimit < commentIds.length && (
          <button className="viewMoreComments" onClick={handleViewComment}>
            View more comments
          </button>
        )}
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
