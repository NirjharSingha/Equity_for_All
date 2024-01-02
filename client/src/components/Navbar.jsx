import React from "react";
import Searchbar from "./Searchbar";
import "./Navbar.css";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import ChatSharpIcon from "@mui/icons-material/ChatSharp";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ProfileIconSidebar from "./ProfileIconSidebar";
import { useGlobals } from "../contexts/Globals";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import jwtDecode from "jwt-decode";
import CountIcon from "./CountIcon";

export const Navbar = () => {
  const { getUserInfo } = useUserInfoContext();
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

  useEffect(() => {
    const displayUser = async () => {
      const { name, profilePic } = await getUserInfo(
        jwtDecode(localStorage.getItem("token")).email
      );
      setUserImg(profilePic);
    };

    displayUser();
  }, []);

  const handleProfileIcon = () => {
    setShowSideBar((prev) => !prev);
  };

  return (
    <>
      {showSideBar && (
        <ProfileIconSidebar setState={setShowSideBar} Ref={navIconRef} />
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
                {unseenNotificationCount > 0 && <CountIcon />}
              </div>
            </div>
          )}
          {windowWidth >= 800 && (
            <div className="gridItem">
              <div className="circle">
                <ChatSharpIcon />
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
