import React from "react";
import "./GroupsBar.css";
import { FaPlus } from "react-icons/fa";
import ItemCard from "./ItemCard";
import { BsFillGearFill } from "react-icons/bs";

const GroupsBar = () => {
  return (
    <div className="groupsBar">
      <div className="createGroupButton">
        <FaPlus className="faPlus" />
        <p>Create New Group</p>
      </div>
      <p className="groupBarHeadings">Groups you created</p>
      <hr style={{ width: "100%", marginTop: "0.35rem" }} />
      <div className="groupItem">
        <ItemCard
          containerClass="groupItem2"
          imgClass="storyProfilePic"
          nameClass="optionListName"
          shouldDisplayImg={true}
          imgSrc={"/profilePicIcon.svg"}
          icon="/profilePicIcon.svg"
          name={"heheaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
        />
        <BsFillGearFill className="groupBarIcon" />
      </div>
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
