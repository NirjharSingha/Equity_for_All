import React from "react";
import Searchbar from "./Searchbar";
import "./Navbar.css";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import ChatSharpIcon from "@mui/icons-material/ChatSharp";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileIconSidebar from "./ProfileIconSidebar";

export const Navbar = () => {
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
          <a href="#" className="navAnchor">
            <img src="/nexusSphere.svg" alt="" width="40" height="41" />
          </a>
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
          <div className="gridItem">
            <div className="circle">
              <NotificationsRoundedIcon />
            </div>
          </div>
          <div className="gridItem">
            <div className="circle">
              <ChatSharpIcon />
            </div>
          </div>
          <div className="gridItem">
            <div className="circle">
              <a href="#" className="navAnchor" onClick={handleProfileIcon}>
                <img src="/navUserIcon.svg" alt="" />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
