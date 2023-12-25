import React from "react";
import ItemCard from "./ItemCard";
import { useGroupContext } from "../contexts/GroupContext";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useGlobals } from "../contexts/Globals";

const GroupMembers = () => {
  const { access, selectedGroup, setAlertMsg, setShowAlertMsg } =
    useGroupContext();
  const [allMembers, setAllMembers] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const { setIsValidJWT } = useGlobals();

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
        if (error.response.status === 401) {
          console.log("inside status code");
          setIsValidJWT(false);
        }
      }
    };
    fetchData();
  }, [selectedGroup]);

  const removeMember = async (member) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/group/addOrRemove`,
        {
          option: "allMembers",
          action: "remove",
          groupId: selectedGroup._id,
          email: member.email,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.status == 200) {
        setAlertMsg(`${member.name} is removed from the group`);
        setShowAlertMsg(true);
        setAllMembers((prevMembers) => {
          return prevMembers.filter(
            (member) => member.email !== response.data.email
          );
        });
      } else {
        console.log(response);
      }
    } catch (error) {
      if (error.response.status === 401) {
        setIsValidJWT(false);
      }
    }
  };

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
            {access === 1 && (
              <button
                className="grpMemBtn"
                onClick={() => removeMember(member)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
    </div>
  );
};

export default GroupMembers;
