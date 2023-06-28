import React from "react";
import "./ProfileIconSidebar.css";
import { BiLogOut } from "react-icons/bi";

const ProfileIconSidebar = () => {
  return (
    <>
      <div className="sideBarContainer">
        <button className="sidebarButton">
          Log out <BiLogOut />
        </button>
      </div>
    </>
  );
};

export default ProfileIconSidebar;
