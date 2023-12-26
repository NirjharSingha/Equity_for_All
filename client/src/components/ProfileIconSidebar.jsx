import React from "react";
import "./ProfileIconSidebar.css";
import { BiLogOut } from "react-icons/bi";
import { useEffect, useRef } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { useGlobals } from "../contexts/Globals";
import { useNavigate } from "react-router-dom";

const ProfileIconSidebar = ({ setState, Ref }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { windowWidth } = useGlobals();
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
        <button className="sidebarButton" onClick={handleProfile}>
          Profile <BsFillPersonFill />
        </button>
      )}
      <button className="sidebarButton" onClick={handleLogout}>
        Log out <BiLogOut />
      </button>
    </div>
  );
};

export default ProfileIconSidebar;
