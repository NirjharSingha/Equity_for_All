import React from "react";
import Searchbar from "./Searchbar";
import "./Navbar.css";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import ChatSharpIcon from "@mui/icons-material/ChatSharp";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ProfileIconSidebar from "./ProfileIconSidebar";
import { useGlobals } from "../contexts/Globals";
import { useChat } from "../contexts/ChatContext";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import jwtDecode from "jwt-decode";
import CountIcon from "./CountIcon";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { getUserInfo } = useUserInfoContext();
  const navigate = useNavigate();
  const {
    windowWidth,
    setShowNotifications,
    navNotificationRef,
    unseenNotificationCount,
  } = useGlobals();
  useEffect(() => {
    console.log("nav bar loaded");
  }, []);
  const navIconRef = useRef(null);
  const [userImg, setUserImg] = useState("");
  const [showSideBar, setShowSideBar] = useState(false);
  const [totalUnreadChat, setTotalUnreadChat] = useState(0);
  const { unreadChat, setUnreadChat } = useChat();

  useEffect(() => {
    const displayUser = async () => {
      const { name, profilePic } = await getUserInfo(
        jwtDecode(localStorage.getItem("token")).email
      );
      setUserImg(profilePic);
    };

    displayUser();
  }, []);

  useEffect(() => {
    let ct = 0;
    unreadChat.map((chat) => {
      ct += chat.count;
    });
    setTotalUnreadChat(ct);
  }, [unreadChat]);

  const handleProfileIcon = () => {
    setShowSideBar((prev) => !prev);
  };

  return (
    <>
      {showSideBar && (
        <ProfileIconSidebar
          setState={setShowSideBar}
          Ref={navIconRef}
          totalUnreadChat={totalUnreadChat}
        />
      )}
      <nav className="navBar">
        <div className="left">
          <img src="/nexusSphere.svg" alt="" className="navIcon" />
          <Searchbar />
        </div>
        <div className="center">
          <ul>
            <li>
              <Link to="/main" className="navAnchor">
                Home
              </Link>
            </li>
            <li>
              <Link to="/main/posts" className="navAnchor">
                Post
              </Link>
            </li>
            <li>
              <Link to="/main/friends" className="navAnchor">
                Friend
              </Link>
            </li>
            <li>
              <Link to="/main/groups" className="navAnchor">
                Group
              </Link>
            </li>
          </ul>
        </div>
        <div className="right">
          {windowWidth >= 800 && (
            <div className="gridItem">
              <div
                className="circle"
                ref={navNotificationRef}
                onClick={() => setShowNotifications((prev) => !prev)}
              >
                <NotificationsRoundedIcon />
                {unseenNotificationCount > 0 && (
                  <CountIcon count={unseenNotificationCount} />
                )}
              </div>
            </div>
          )}
          {windowWidth >= 800 && (
            <div className="gridItem">
              <div
                className="circle"
                onClick={() => {
                  if (windowWidth < 1150 && window.location.href !== `${import.meta.env.VITE_CLIENT_URL}main/chat`) {
                    navigate("/main/chat");
                  }
                }}
              >
                <ChatSharpIcon />
                {totalUnreadChat > 0 && <CountIcon count={totalUnreadChat} />}
              </div>
            </div>
          )}
          <div className="gridItem">
            <div
              className="circle"
              onClick={handleProfileIcon}
              ref={navIconRef}
            >
              <img
                src={userImg === "" ? "/navUserIcon.svg" : userImg}
                alt=""
                className="navIcon"
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
