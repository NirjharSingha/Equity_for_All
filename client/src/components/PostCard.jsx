import React, { useState, useEffect, useRef } from "react";
import "./PostCard.css";
import { AiFillLike, AiOutlineLike, AiFillDislike } from "react-icons/ai";
import { FaLaughSquint, FaSadCry, FaAngry, FaRegComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { PiShareFatBold } from "react-icons/pi";
import AllLikes from "./Likes";
import Comment from "./Comment";
import axios from "axios";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { useLikesContext } from "../contexts/LikesContext";
import { usePostContext } from "../contexts/PostContext";
import { useLikesListContext } from "../contexts/LikesListContext";
import jwtDecode from "jwt-decode";
import Share from "./Share";
import LikesList from "./LikesList";
import ConfirmWindow from "./ConfirmWindow";
import { useFileContext } from "../contexts/FileContext";
import { useGlobals } from "../contexts/Globals";
import { useGroupContext } from "../contexts/GroupContext";
import EditSideBar from "./EditSideBar";

const PostCard = ({ post, shareFlag }) => {
  const { setIsValidJWT } = useGlobals();
  const { deleteFile } = useFileContext();
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
  const { checkInitialMount, setUserLikes } = useLikesContext();
  const [userName, setUserName] = useState("User Name");
  const [userImg, setUserImg] = useState("");
  const [showEditButton, setShowEditButton] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { setEditPost, setSelectedPost, setShowAlert, setAlertMessage } =
    usePostContext();
  const { setShowAlertMsg, setAlertMsg, selectedGroup, isGroupPost } =
    useGroupContext();
  const editContainerRef = useRef(null);
  const { setYourPostArray } = usePostContext();
  const [showLikesList, setShowLikesList] = useState(false);
  const shareComponentRef = useRef(null);
  const [showPostShare, setShowPostShare] = useState(false);
  const [likesData, setLikesData] = useState({
    like: post.like,
    dislike: post.dislike,
    laugh: post.laugh,
    angry: post.angry,
    sad: post.sad,
    love: post.love,
  });
  const [total, setTotal] = useState();
  const { loadLikesListData } = useLikesListContext();
  const [showConfirm, setShowConfirm] = useState(false);

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

  const handleDeletePost = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/post/deletePost/${post._id}`,
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.status == 200) {
        // if (post.postAttachments.length > 0) {
        //   deleteFile(post.postAttachments);
        // } else {
        //   console.log("no attachments");
        // }
        console.log("post deleted successfully");
        setShowEdit(false);
        setYourPostArray((prevPosts) => {
          return prevPosts.filter((post) => post._id !== response.data.id);
        });

        if (!isGroupPost) {
          setAlertMessage("Post deleted successfully");
          setShowAlert(true);
        } else {
          setAlertMsg("Post deleted successfully");
          setShowAlertMsg(true);
        }
      } else {
        console.log(response);
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.log("inside status code");
        setIsValidJWT(false);
      }
    }
  };

  const handleMouseLeaveFromLike = () => {
    setTimeout(() => {
      setMouseOnLike(false);
    }, 500);
  };

  useEffect(() => {
    if (!mouseOnAllLikes && !mouseOnLike && !shareFlag) {
      setShouldDisplayAllLikes(false);
    }
  }, [mouseOnAllLikes, mouseOnLike]);

  const handleLikePut = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/post/postOptions/postLike`,
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
    } catch (error) {
      if (error.response.status === 401) {
        console.log("inside status code");
        setIsValidJWT(false);
      }
    }
  };

  useEffect(() => {
    if (!shareFlag) {
      loadLikesListData(likesData, selected, setLikesData, setTotal);
    }
    if (!shareFlag) {
      checkInitialMount(isInitialMount, handleLikePut);
    }
  }, [selected]);

  useEffect(() => {
    const displayPostUser = async () => {
      const { name, profilePic } = await getUserInfo(post.userEmail);
      setUserName(name), setUserImg(profilePic);
    };

    if (!shareFlag) {
      displayPostUser();
      setUserLikes(post, setSelected, setPrevLike);
    }
    let email;
    if (!shareFlag) {
      email = jwtDecode(localStorage.getItem("token")).email;
    }
    if (!shareFlag && post.userEmail === email) {
      setShowEditButton(true);
    }
  }, []);

  const handleSeeMore = () => {
    setExpanded((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        editContainerRef.current &&
        !editContainerRef.current.contains(event.target)
      ) {
        setShowEdit(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    console.log("post card loaded");
    const handleOutsideClick = (event) => {
      if (
        shareComponentRef.current &&
        !shareComponentRef.current.contains(event.target)
      ) {
        setShowPostShare(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  let paragraphs;
  if (post.postDescription) {
    paragraphs = post.postDescription.split("\n").map((paragraph, index) => (
      <React.Fragment key={index}>
        <p>{paragraph}</p>
      </React.Fragment>
    ));
  }

  const handleEdit = () => {
    setSelectedPost(post);
    setEditPost(true);
    setShowEdit(false);
  };

  const handleDelete = () => {
    setShowConfirm(true);
    setShowEdit(false);
  };

  return (
    <>
      {showConfirm && (
        <ConfirmWindow
          handleAction={handleDeletePost}
          setShowConfirm={setShowConfirm}
          flag="post"
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
      {showPostShare && (
        <div ref={shareComponentRef}>
          <Share post={post} />
        </div>
      )}
      {showComments && (
        <Comment setShowComments={setShowComments} post={post} />
      )}
      <div className="postCard">
        {showEdit && (
          <EditSideBar
            containerClass="editPostButton"
            containerRef={editContainerRef}
            handler_1={handleEdit}
            handler_2={handleDelete}
          />
        )}
        <div className="postHeading">
          {userImg !== "" && (
            <img src={userImg} alt="" className="postUserProfilePic" />
          )}
          {userImg === "" && (
            <img
              src="/profilePicIcon.svg" // Use the path to the SVG in the public folder
              alt=""
              className="postUserProfilePic"
            />
          )}
          <div className="postHelperInfo">
            <div className="postEditOptionContainer">
              <h3 className="postUserName">{userName}</h3>
              <div
                className={showEditButton ? "editShow" : "displayNone"}
                onClick={() => setShowEdit((prev) => !prev)}
              >
                ...
              </div>
            </div>
            <p className="postTime">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className={expanded ? "expandedPostContent" : "postContent"}>
          {paragraphs}
          {expanded ? (
            <div className="postAttachmentAll">
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
            </div>
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
            onMouseLeave={() => {
              setMouseOnAllLikes(false);
            }}
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
        {!shareFlag && (
          <>
            <div className="postOptions">
              <div
                className="likeContainer flexContainerPost"
                onMouseEnter={() => {
                  setMouseOnLike(true);
                  setShouldDisplayAllLikes(true);
                }}
                onMouseLeave={handleMouseLeaveFromLike}
                onClick={() => {
                  setSelected("");
                  setShouldDisplayAllLikes((prev) => !prev);
                }}
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
              <div
                className="commentIcon"
                onClick={() => setShowComments(true)}
              >
                <FaRegComment className="iconFlex" />
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
            <div className="postOptionCount">
              <p
                className="postOptionCountText"
                onClick={() => {
                  setSelectedPost(post);
                  setShowLikesList((prev) => !prev);
                }}
              >
                {`${total} reactions`}
              </p>
              <p></p>
              <p className="postOptionCountText"></p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PostCard;
