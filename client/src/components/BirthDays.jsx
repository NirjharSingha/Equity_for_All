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
        if (
          error.response.status === 401 &&
          error.response.statusText === "Unauthorized"
        ) {
          console.log("inside status code");
          setIsValidJWT(false);
        }
        console.error("Error fetching comment count:", error);
      }
    };

    fetchBirthdays();
  }, []);

  useEffect(() => {
    console.log(birthDayInfo);
  }, [birthDayInfo]);

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
                    <svg
                      id="logo-15"
                      width="2.5rem"
                      height="2.5rem"
                      viewBox="0 0 49 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="birthdayImg"
                    >
                      {" "}
                      <path
                        d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z"
                        className="ccustom"
                        fill="#17CF97"
                      ></path>{" "}
                      <path
                        d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z"
                        className="ccustom"
                        fill="#17CF97"
                      ></path>{" "}
                      <path
                        d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z"
                        className="ccustom"
                        fill="#17CF97"
                      ></path>{" "}
                      <path
                        d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z"
                        className="ccustom"
                        fill="#17CF97"
                      ></path>{" "}
                    </svg>
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
