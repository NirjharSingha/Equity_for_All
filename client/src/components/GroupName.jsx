import React, { useState } from "react";
import ItemCard from "./ItemCard";
import { BsFillGearFill } from "react-icons/bs";

const GroupName = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        className="groupItem"
        style={
          show
            ? { borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }
            : {}
        }
      >
        <ItemCard
          containerClass="groupItem2"
          imgClass="storyProfilePic"
          nameClass="optionListName"
          shouldDisplayImg={true}
          imgSrc={"/profilePicIcon.svg"}
          icon="/profilePicIcon.svg"
          name={"heheaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
        />
        <BsFillGearFill
          className="groupBarIcon"
          onClick={() => setShow((prev) => !prev)}
        />
      </div>
      {show && <button className={`groupBarButton`}>Join Group</button>}
    </>
  );
};

export default GroupName;
