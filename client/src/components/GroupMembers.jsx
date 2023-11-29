import React from "react";
import ItemCard from "./ItemCard";
import { useGroupContext } from "../contexts/GroupContext";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";

const GroupMembers = () => {
  const { access, selectedGroup } = useGroupContext();
  const [allMembers, setAllMembers] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/group/allMembers/${
            selectedGroup._id
          }`,
          {
            headers: {
              token: token,
            },
          }
        );
        if (response) {
          setAllMembers(response.data);
          setShowLoading(false);
        }
      } catch (error) {
        console.log(error);
        if (
          error.response.status === 401 &&
          error.response.statusText === "Unauthorized"
        ) {
          console.log("inside status code");
          setIsValidJWT(false);
        }
      }
    };
    fetchData();
  }, [selectedGroup]);

  return (
    <div className="grpStream">
      {showLoading && (
        <div className="loadingContainer">
          <Loading />
        </div>
      )}
      {!showLoading &&
        allMembers &&
        allMembers.map((member) => (
          <div
            className="grpMember"
            style={access === 1 ? { gridTemplateColumns: "auto 5.5rem" } : {}}
            key={member._id}
          >
            <ItemCard
              containerClass="grpMem"
              imgClass="storyProfilePic"
              nameClass="optionListName"
              shouldDisplayImg={member.profilePic !== ""}
              imgSrc={member.profilePic}
              icon="/profilePicIcon.svg"
              name={member.name}
            />
            {access === 1 && <button className="grpMemBtn">Remove</button>}
          </div>
        ))}
    </div>
  );
};

export default GroupMembers;
