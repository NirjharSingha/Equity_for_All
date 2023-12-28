import React from "react";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import ItemCard from "./ItemCard";
import axios from "axios";
import "./GroupInvite.css";
import { useGlobals } from "../contexts/Globals";
import { useGroupContext } from "../contexts/GroupContext";

const GroupInvite = ({ setState }) => {
  const [showLoading, setShowLoading] = useState(false);
  const [listToDisplay, setListToDisplay] = useState([]);
  const { setIsValidJWT } = useGlobals();
  const { selectedGroup } = useGroupContext();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setShowLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_URL
          }/group/inviteMember?flag=group&id=${selectedGroup._id}`,
          {
            headers: {
              token: token,
            },
          }
        );
        if (response) {
          setListToDisplay(response.data);
          setShowLoading(false);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          setIsValidJWT(false);
        }
      }
    };
    fetchInfo();
  }, []);

  const handleInvite = async (item) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/group/addOrRemove`,
        {
          option: "invitationSent",
          action: "add",
          groupId: selectedGroup._id,
          email: item.email,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.status == 200) {
        setListToDisplay((prev) => {
          return prev.filter((data) => data._id !== item._id);
        });
      }
    } catch (error) {
      if (error.response.status === 401) {
        setIsValidJWT(false);
      }
    }
  };

  return (
    <div className="fullScreenBlur">
      <div className="editPostCross" onClick={() => setState(false)}>
        X
      </div>
      <div className="allFriendsContainer">
        {showLoading && (
          <div className="loadingContainer">
            <Loading />
          </div>
        )}
        <div className="allFriends">
          {listToDisplay.map((item) => (
            <div
              key={item._id}
              className="friendHover"
              onClick={() => handleInvite(item)}
            >
              <ItemCard
                key={item._id}
                containerClass="verticalContainerLine"
                imgClass="optionListImg"
                nameClass="optionListName"
                shouldDisplayImg={item.profilePic !== ""}
                imgSrc={item.profilePic}
                icon="/profilePicIcon.svg"
                name={item.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupInvite;
