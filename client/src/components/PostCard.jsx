import React, { useState, useEffect, useRef } from "react";
import "./PostCard.css";
import { AiFillLike, AiOutlineLike, AiFillDislike } from "react-icons/ai";
import { FaLaughSquint, FaSadCry, FaAngry, FaComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { PiShareFatBold } from "react-icons/pi";
import AllLikes from "./AllLikes";
import Comment from "./Comment";
import axios from "axios";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { useVerifyFileContext } from "../contexts/VerifyFileContext";
import { useLikesContext } from "../contexts/LikesContext";
import { useDisplayUserContext } from "../contexts/DisplayUserContext";

const PostCard = ({ setShowPostShare, post }) => {
  const [expanded, setExpanded] = useState(false);
  const [mouseOnLike, setMouseOnLike] = useState(false);
  const [mouseOnAllLikes, setMouseOnAllLikes] = useState(false);
  const [selected, setSelected] = useState("");
  const [prevLike, setPrevLike] = useState("");
  const [shouldDisplayAllLikes, setShouldDisplayAllLikes] = useState(false);
  const imageRef = useRef([]);
  const [showComments, setShowComments] = useState(false);
  const isInitialMount = useRef(true);
  const { getUserInfo } = useUserInfoContext();
  const { isFileExists } = useVerifyFileContext();
  const { checkInitialMount, setUserLikes } = useLikesContext();
  const { displayUser } = useDisplayUserContext();
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");
  const [shouldDisplayUserImg, setShouldDisplayUserImg] = useState(false);

  const toggleFullscreen = (index) => {
    const imageElement = imageRef.current[index];

    if (!document.fullscreenElement) {
      if (imageElement.requestFullscreen) {
        imageElement.requestFullscreen();
      } else if (imageElement.mozRequestFullScreen) {
        imageElement.mozRequestFullScreen();
      } else if (imageElement.webkitRequestFullscreen) {
        imageElement.webkitRequestFullscreen();
      } else if (imageElement.msRequestFullscreen) {
        imageElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
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

  const handleLikePut = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      "http://localhost:5000/post/postOptions/postLike",
      { selectedLike: selected, postID: post._id, prevLike: prevLike },
      {
        headers: {
          token: token,
        },
      }
    );
    if (response.status == 200) {
      setPrevLike(selected);
    }
  };

  useEffect(() => {
    checkInitialMount(isInitialMount, handleLikePut);
  }, [selected]);

  useEffect(() => {
    const displayPostUser = async () => {
      const { name, profilePic } = await getUserInfo(post.userEmail);
      setUserName(name), setUserImg(profilePic);
      displayUser(isFileExists, setShouldDisplayUserImg, profilePic);
    };
    displayPostUser();
    setUserLikes(post, setSelected, setPrevLike);
  }, []);

  const handleSeeMore = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <>
      {showComments && (
        <Comment setShowComments={setShowComments} post={post} />
      )}
      <div className="postCard">
        <div className="postHeading">
          {shouldDisplayUserImg && (
            <img src={userImg} alt="" className="postUserProfilePic" />
          )}
          {!shouldDisplayUserImg && (
            <svg
              id="logo-15"
              width="3rem"
              height="3rem"
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
          <h3 className="postUserName">{userName}</h3>
        </div>
        <div className={expanded ? "expandedPostContent" : "postContent"}>
          <p>{post.postDescription}</p>
          {expanded ? (
            <>
              {post.postAttachments.map((attachment, index) => (
                <div key={index}>
                  {attachment.endsWith(".jpg") ||
                  attachment.endsWith(".png") ||
                  attachment.endsWith(".jpeg") ? (
                    <img
                      key={index}
                      src={attachment}
                      alt=""
                      width={250}
                      height={200}
                      ref={(el) => (imageRef.current[index] = el)}
                      onClick={() => toggleFullscreen(index)}
                      className="postFiles"
                    />
                  ) : attachment.endsWith(".mp4") ? (
                    <video controls width="250">
                      <source
                        src={attachment}
                        width={200}
                        height={200}
                        controls
                        className="postFiles"
                      />
                    </video>
                  ) : (
                    <p></p>
                  )}
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="thirdRow">
          <div
            className="allLikes"
            onMouseEnter={() => {
              setMouseOnAllLikes(true);
            }}
            onMouseLeave={() => setMouseOnAllLikes(false)}
          >
            {shouldDisplayAllLikes && (mouseOnAllLikes || mouseOnLike) && (
              <AllLikes
                setSelected={setSelected}
                setShouldDisplayAllLikes={setShouldDisplayAllLikes}
                isCommentPage={false}
              />
            )}
          </div>
          <div className="seeMore">
            <button className="seeMoreButton" onClick={handleSeeMore}>
              {expanded ? "See Less" : "See More"}
            </button>{" "}
          </div>
        </div>
        <div className="postOptions">
          <div
            className="likeContainer flexContainerPost"
            onMouseEnter={() => {
              setMouseOnLike(true);
              setShouldDisplayAllLikes(true);
            }}
            onMouseLeave={handleMouseLeaveFromLike}
            onClick={() => setSelected("")}
          >
            {selected === "like" ? (
              <AiFillLike className="iconFlex blue" />
            ) : selected === "dislike" ? (
              <AiFillDislike className="iconFlex blue" />
            ) : selected === "laugh" ? (
              <FaLaughSquint className="iconFlex yellow" />
            ) : selected === "angry" ? (
              <FaAngry className="iconFlex red" />
            ) : selected === "sad" ? (
              <FaSadCry className="iconFlex yellow" />
            ) : selected === "love" ? (
              <FcLike className="iconFlex" />
            ) : (
              <AiOutlineLike className="likeIcon iconFlex" />
            )}{" "}
            <span className="postOptionText">
              {selected === "" ? "Like" : ""}
            </span>
          </div>
          <div className="commentIcon" onClick={() => setShowComments(true)}>
            <FaComment className="iconFlex gray" />
            <span>Comment</span>
          </div>
          <div
            className="shareIcon"
            onClick={() => setShowPostShare((prev) => !prev)}
          >
            <PiShareFatBold className="iconFlex" />
            <span>Share</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
