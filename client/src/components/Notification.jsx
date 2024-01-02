import React, { useState, useEffect, useRef } from "react";
import "./Notification.css";
import { useGlobals } from "../contexts/Globals";
import NotificationCard from "./NotificationCard";
import axios from "axios";

const Notification = () => {
  const {
    setIsValidJWT,
    windowWidth,
    setShowNotifications,
    navNotificationRef,
  } = useGlobals();
  const [selectedOption, setSelectedOption] = useState("new");
  const containerRef = useRef(null);
  const [shouldFetchAllNotification, setShouldFetchAllNotification] =
    useState(true);
  const [newNotifications, setNewNotifications] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);

  const fetchNotifications = async (flag) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/notification/${flag}`,
        {
          headers: {
            token: token,
          },
        }
      );
      if (response) {
        if (flag === "new") {
          setNewNotifications(response.data);
        } else {
          setAllNotifications(response.data);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        setIsValidJWT(false);
      }
    }
  };

  const deleteAll = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/notification/deleteAll`,
        {
          headers: {
            token: token,
          },
        }
      );
      if (response) {
        setAllNotifications([]);
        setNewNotifications([]);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        setIsValidJWT(false);
      }
    }
  };

  const deleteOne = async (_id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/notification/deleteOne/${_id}`,
        {
          headers: {
            token: token,
          },
        }
      );
      if (response) {
        setNewNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification._id !== _id)
        );
        setAllNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification._id !== _id)
        );
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        setIsValidJWT(false);
      }
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        if (windowWidth >= 800) {
          if (
            navNotificationRef.current &&
            !navNotificationRef.current.contains(event.target)
          ) {
            setShowNotifications(false);
          }
        } else {
          setShowNotifications(false);
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    fetchNotifications("new");

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="notifications" ref={containerRef}>
      <div
        className="commentCrossContainer"
        style={{
          justifyContent: "flex-end",
          borderTopRightRadius: `${windowWidth > 440 ? 0 : "10px"}`,
          backgroundColor: "rgb(162, 158, 158)",
          height: "2.1rem",
        }}
      >
        <button
          className="commentCross"
          onClick={() => setShowNotifications(false)}
        >
          X
        </button>
      </div>
      <div
        className="grpOptionBtn"
        style={{
          marginTop: "0.1rem",
          marginBottom: "0.2rem",
          borderBottom: "2px solid rgb(120, 118, 118)",
          paddingBottom: "0.2rem",
        }}
      >
        <button
          className={
            selectedOption === "new" ? "selectedGrpOption" : "grpPageBtn"
          }
          onClick={() => setSelectedOption("new")}
        >
          New
        </button>
        <button
          className={
            selectedOption === "all" ? "selectedGrpOption" : "grpPageBtn"
          }
          onClick={() => {
            setSelectedOption("all");
            if (shouldFetchAllNotification) {
              fetchNotifications("all");
              setShouldFetchAllNotification(false);
            }
          }}
        >
          All
        </button>
      </div>
      <div
        className="createPost"
        style={
          windowWidth > 500
            ? { maxHeight: `calc(100svh - 13rem)` }
            : { maxHeight: `calc(100svh - 11.3rem)` }
        }
      >
        <div className="createPostFirstRow" style={{ paddingBottom: "0.2rem" }}>
          {selectedOption === "new" &&
            newNotifications.map((notification) => (
              <NotificationCard
                notification={notification}
                deleteOne={() => deleteOne(notification._id)}
                key={notification._id}
              />
            ))}
          {selectedOption === "all" &&
            allNotifications.map((notification) => (
              <NotificationCard
                notification={notification}
                deleteOne={() => deleteOne(notification._id)}
                key={notification._id}
              />
            ))}
        </div>
        <div className="createPostSecondRow">
          <button
            className={"createPostButton buttonHover"}
            onClick={deleteAll}
          >
            Delete All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
