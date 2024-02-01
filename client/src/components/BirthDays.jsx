import React from "react";
import "./BirthDays.css";
import { useState, useEffect } from "react";
import { useFriendContext } from "../contexts/FriendContext";
import axios from "axios";
import Loading from "./Loading";
import { useGlobals } from "../contexts/Globals";

const BirthDays = () => {
  const { setIsValidJWT } = useGlobals();
  const [allMonths] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [birthDayInfo, setBirthdayInfo] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  const { friendsID } = useFriendContext();

  useEffect(() => {
    console.log("birthday component loaded");

    const fetchBirthdays = async () => {
      try {
        setShowLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_URL
          }/friend/friendBirthdays?emails=${friendsID}`,
          {
            headers: {
              token: token,
            },
          }
        );
        if (response) {
          setBirthdayInfo(response.data);
          setShowLoading(false);
        }
      } catch (error) {
        if (error.response.status === 401) {
          console.log("inside error code");
          setIsValidJWT(false);
        }
        console.error("Error fetching comment count:", error);
      }
    };

    fetchBirthdays();
  }, []);

  return (
    <div className="birthDayContainer">
      {showLoading && (
        <div className="loadingContainer">
          <Loading />
        </div>
      )}
      {!showLoading &&
        birthDayInfo.map((birthdayObj, index) => (
          <div className="monthContainer" key={birthdayObj._id}>
            <p className="monthName">{allMonths[index]}</p>
            <div className="listDisplay">
              {birthdayObj.email.map((userEmail, index) => (
                <div className="monthContainerLine" key={userEmail}>
                  {birthdayObj.profilePic[index] !== "" && (
                    <img
                      src={birthdayObj.profilePic[index]}
                      alt=""
                      className="birthdayImg"
                    />
                  )}
                  {birthdayObj.profilePic[index] === "" && (
                    <img
                      src="/profilePicIcon.svg" // Use the path to the SVG in the public folder
                      alt=""
                      className="birthdayImg"
                    />
                  )}
                  <p className="birthDayListName">{birthdayObj.name[index]}</p>
                  <p className="birthDate">{birthdayObj.dayOfMonth[index]}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};
export default BirthDays;
