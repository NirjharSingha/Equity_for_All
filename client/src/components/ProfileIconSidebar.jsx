import React from "react";
import "./ProfileIconSidebar.css";
import { BiLogOut } from "react-icons/bi";
import { useEffect, useRef } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdNotificationsActive } from "react-icons/md";
import { IoChatboxEllipses } from "react-icons/io5";
import { useGlobals } from "../contexts/Globals";
import { useNavigate } from "react-router-dom";
import CountIcon from "./CountIcon";

const ProfileIconSidebar = ({ setState, Ref }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { windowWidth, setShowNotifications, unseenNotificationCount } =
    useGlobals();
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        if (Ref.current && !Ref.current.contains(event.target)) {
          setState(false);
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = import.meta.env.VITE_CLIENT_URL;
  };
  const handleProfile = () => {
    navigate("/main/yourProfile");
    setState(false);
  };

  return (
    <div className="sideBarContainer" ref={containerRef}>
      {windowWidth < 800 && (
        <>
          <button className="sidebarButton" onClick={handleProfile}>
            Profile <BsFillPersonFill style={{ marginLeft: "0.2rem" }} />
          </button>
          <button
            className="sidebarButton"
            onClick={() => {
              setShowNotifications(true);
              setState(false);
            }}
          >
            Notification
            <MdNotificationsActive style={{ marginLeft: "0.2rem" }} />
            {unseenNotificationCount > 0 && <CountIcon />}
          </button>
          <button className="sidebarButton" onClick={handleProfile}>
            Chat <IoChatboxEllipses style={{ marginLeft: "0.2rem" }} />
          </button>
        </>
      )}
      <button className="sidebarButton" onClick={handleLogout}>
        Log out <BiLogOut style={{ marginLeft: "0.2rem" }} />
      </button>
    </div>
  );
};

export default ProfileIconSidebar;
