import React from "react";
import Searchbar from "./Searchbar";
import "./Navbar.css";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import ChatSharpIcon from "@mui/icons-material/ChatSharp";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileIconSidebar from "./ProfileIconSidebar";
import { useGlobals } from "../contexts/Globals";

export const Navbar = () => {
  const { windowWidth } = useGlobals();
  useEffect(() => {
    console.log("nav bar loaded");
  }, []);

  const [showSideBar, setShowSideBar] = useState(false);

  const handleProfileIcon = () => {
    setShowSideBar((prevVisible) => !prevVisible);
  };

  return (
    <>
      {showSideBar && <ProfileIconSidebar />}
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
              <div className="circle">
                <NotificationsRoundedIcon />
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
            <div className="circle" onClick={handleProfileIcon}>
              <img src="/navUserIcon.svg" alt="" className="navIcon" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
