import React from "react";
import "./GroupsBar.css";
import { FaPlus } from "react-icons/fa";

const GroupsBar = () => {
  return (
    <div className="groupsBar">
      <div className="createGroupButton">
        <FaPlus className="faPlus" />
        <p>Create New Group</p>
      </div>
      <p className="groupBarHeadings">Groups you created</p>
    </div>
  );
};

export default GroupsBar;
