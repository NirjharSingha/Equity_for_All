import React from "react";
import Searchbar from "./Searchbar";
import "./Navbar.css";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import ChatSharpIcon from "@mui/icons-material/ChatSharp";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileIconSidebar from "./ProfileIconSidebar";

export const Navbar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    console.log("nav bar loaded");
  }, []);

  useEffect(() => {
    // Function to handle the media query change
    const handleResize = (e) => {
      setIsSmallScreen(e.matches);
    };

    // Create a media query list
    const mediaQueryList = window.matchMedia("(max-width: 800px)");

    // Initial check of the media query
    setIsSmallScreen(mediaQueryList.matches);

    // Add an event listener for the media query
    mediaQueryList.addEventListener("change", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      mediaQueryList.removeEventListener("change", handleResize);
    };
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
          <Searchbar isSmallScreen={!isSmallScreen} />
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
          {!isSmallScreen && (
            <div className="gridItem">
              <div className="circle">
                <NotificationsRoundedIcon />
              </div>
            </div>
          )}
          {!isSmallScreen && (
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
