import React from "react";
import "./GroupsBar.css";
import { FaPlus } from "react-icons/fa";
import ItemCard from "./ItemCard";
import { BsFillGearFill } from "react-icons/bs";
import { useGroupContext } from "../contexts/GroupContext";
import GroupName from "./GroupName";

const GroupsBar = () => {
  const { setShowCreateGroup } = useGroupContext();
  return (
    <div className="groupsBar">
      <div
        className="createGroupButton"
        onClick={() => setShowCreateGroup(true)}
      >
        <FaPlus className="faPlus" />
        <p>Create New Group</p>
      </div>
      <p className="groupBarHeadings">Groups you created</p>
      <hr style={{ width: "100%", marginTop: "0.35rem" }} />
      <GroupName />
      <ItemCard
        containerClass="groupItem"
        imgClass="storyProfilePic"
        nameClass="optionListName"
        shouldDisplayImg={true}
        imgSrc={"/profilePicIcon.svg"}
        icon="/profilePicIcon.svg"
        name={"heheaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
      />
      <ItemCard
        containerClass="groupItem"
        imgClass="storyProfilePic"
        nameClass="optionListName"
        shouldDisplayImg={true}
        imgSrc={"/profilePicIcon.svg"}
        icon="/profilePicIcon.svg"
        name={"heheaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
      />
      <ItemCard
        containerClass="groupItem"
        imgClass="storyProfilePic"
        nameClass="optionListName"
        shouldDisplayImg={true}
        imgSrc={"/profilePicIcon.svg"}
        icon="/profilePicIcon.svg"
        name={"heheaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
      />
      <p className="groupBarHeadings">Groups you created</p>
      <hr style={{ width: "100%", marginTop: "0.35rem" }} />
      <ItemCard
        containerClass="groupItem"
        imgClass="storyProfilePic"
        nameClass="optionListName"
        shouldDisplayImg={true}
        imgSrc={"/profilePicIcon.svg"}
        icon="/profilePicIcon.svg"
        name={"heheaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
      />
      <ItemCard
        containerClass="groupItem"
        imgClass="storyProfilePic"
        nameClass="optionListName"
        shouldDisplayImg={true}
        imgSrc={"/profilePicIcon.svg"}
        icon="/profilePicIcon.svg"
        name={"heheaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
      />
      <ItemCard
        containerClass="groupItem"
        imgClass="storyProfilePic"
        nameClass="optionListName"
        shouldDisplayImg={true}
        imgSrc={"/profilePicIcon.svg"}
        icon="/profilePicIcon.svg"
        name={"heheaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
      />
      <ItemCard
        containerClass="groupItem"
        imgClass="storyProfilePic"
        nameClass="optionListName"
        shouldDisplayImg={true}
        imgSrc={"/profilePicIcon.svg"}
        icon="/profilePicIcon.svg"
        name={"heheaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
      />
      <p className="groupBarHeadings">Groups you created</p>
      <hr style={{ width: "100%", marginTop: "0.35rem" }} />
      <ItemCard
        containerClass="groupItem"
        imgClass="storyProfilePic"
        nameClass="optionListName"
        shouldDisplayImg={true}
        imgSrc={"/profilePicIcon.svg"}
        icon="/profilePicIcon.svg"
        name={"heheaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
      />
      <ItemCard
        containerClass="groupItem"
        imgClass="storyProfilePic"
        nameClass="optionListName"
        shouldDisplayImg={true}
        imgSrc={"/profilePicIcon.svg"}
        icon="/profilePicIcon.svg"
        name={"heheaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
      />
      <ItemCard
        containerClass="groupItem"
        imgClass="storyProfilePic"
        nameClass="optionListName"
        shouldDisplayImg={true}
        imgSrc={"/profilePicIcon.svg"}
        icon="/profilePicIcon.svg"
        name={"heheaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
      />
      <ItemCard
        containerClass="groupItem"
        imgClass="storyProfilePic"
        nameClass="optionListName"
        shouldDisplayImg={true}
        imgSrc={"/profilePicIcon.svg"}
        icon="/profilePicIcon.svg"
        name={"heheaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
      />
    </div>
  );
};

export default GroupsBar;
