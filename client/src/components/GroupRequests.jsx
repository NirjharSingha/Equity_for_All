import React from "react";
import { useGroupContext } from "../contexts/GroupContext";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import GroupReq from "./GroupReq";
import { useGlobals } from "../contexts/Globals";

const GroupRequests = () => {
  const { selectedGroup } = useGroupContext();
  const [allMembers, setAllMembers] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const { setIsValidJWT } = useGlobals();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/group/allRequests/${
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
          <GroupReq member={member} key={member._id} setState={setAllMembers} />
        ))}
    </div>
  );
};

export default GroupRequests;
