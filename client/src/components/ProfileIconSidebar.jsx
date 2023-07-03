import React from "react";
import "./ProfileIconSidebar.css";
import { BiLogOut } from "react-icons/bi";

const ProfileIconSidebar = () => {
  const handleLogout = () => {};
  return (
    <>
      <div className="sideBarContainer">
        <button className="sidebarButton" onClick={handleLogout}>
          Log out <BiLogOut />
        </button>
      </div>
    </>
  );
};

export default ProfileIconSidebar;
