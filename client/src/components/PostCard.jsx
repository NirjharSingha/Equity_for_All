import React, { useState, useEffect, useRef } from "react";
import "./PostCard.css";
import { AiFillLike, AiOutlineLike, AiFillDislike } from "react-icons/ai";
import { FaLaughSquint, FaSadCry, FaAngry, FaComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { PiShareFatBold } from "react-icons/pi";
import AllLikes from "./AllLikes";
import Comment from "./Comment";
import axios from "axios";

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

  const getEmailFromToken = () => {
    const token = localStorage.getItem("token");
    const payload = token.split(".")[1];
    const decodedPayload = atob(payload);
    const { email } = JSON.parse(decodedPayload);
    return email;
  };

  const toggleFullscreen = (index) => {
    const imageElement = imageRef.current[index];

    if (!document.fullscreenElement) {
      if (imageElement.requestFullscreen) {
        imageElement.requestFullscreen();
      } else if (imageElement.mozRequestFullScreen) {
        // Firefox
        imageElement.mozRequestFullScreen();
      } else if (imageElement.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        imageElement.webkitRequestFullscreen();
      } else if (imageElement.msRequestFullscreen) {
        // IE/Edge
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
      "http://localhost:5000/post/postOptions/like",
      { selectedLike: selected, postID: post._id, prevLike: prevLike },
      {
        headers: {
          token: token,
        },
      }
    );
    if (response.status == 200) {
      console.log("like added");
      setPrevLike(selected);
    }
  };

  useEffect(() => {
    // Skip the API call on initial mount
    if (!isInitialMount.current) {
      handleLikePut();
    } else {
      isInitialMount.current = false;
    }
  }, [selected]);

  useEffect(() => {
    const email = getEmailFromToken();
    if (post.like.includes(email)) {
      setSelected("like");
      setPrevLike("like");
    } else if (post.dislike.includes(email)) {
      setSelected("dislike");
      setPrevLike("dislike");
    } else if (post.laugh.includes(email)) {
      setSelected("laugh");
      setPrevLike("laugh");
    } else if (post.love.includes(email)) {
      setSelected("love");
      setPrevLike("love");
    } else if (post.sad.includes(email)) {
      setSelected("sad");
      setPrevLike("sad");
    } else if (post.angry.includes(email)) {
      setSelected("angry");
      setPrevLike("angry");
    }
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
          {/* <img
            src="http://localhost:5000/uploads/1688751295691-database.png"
            alt=""
            className="postUserProfilePic"
          /> */}
          <h3 className="postUserName">User Name</h3>
        </div>
        <div className={expanded ? "expandedPostContent" : "postContent"}>
          <p>{post.postDescription}</p>
          {/* Use curly braces to enclose the JSX inside the ternary operator */}
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
