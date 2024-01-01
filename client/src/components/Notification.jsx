import React, { useState, useEffect, useRef } from "react";
import "./Notification.css";
import { useGlobals } from "../contexts/Globals";

const Notification = () => {
  const { isValidJWT, windowWidth, setShowNotifications, navNotificationRef } =
    useGlobals();
  const [selectedOption, setSelectedOption] = useState("new");
  const containerRef = useRef(null);

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
          onClick={() => setSelectedOption("all")}
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
          <div className="notificationCard">
            <p className="notificationMessage">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
              unde dolor maiores quam quia quos? Saepe praesentium porro
              necessitatibus
              impeditaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!
            </p>
            <p className="notificationTime">Lorem ipsum</p>
            <button
              className="createStoryButton deleteNotificationHover"
              style={{
                maxHeight: "1.65rem",
                minHeight: "1.65rem",
                marginTop: "0.2rem",
                marginBottom: "0.2rem",
                maxWidth: "90%",
              }}
            >
              Delete
            </button>
          </div>
          <div className="notificationCard">
            <p className="notificationMessage">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
              unde dolor maiores quam quia quos? Saepe praesentium porro
              necessitatibus
              impeditaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!
            </p>
            <p className="notificationTime">Lorem ipsum</p>
            <button
              className="createStoryButton deleteNotificationHover"
              style={{
                maxHeight: "1.65rem",
                minHeight: "1.65rem",
                marginTop: "0.2rem",
                marginBottom: "0.2rem",
                maxWidth: "90%",
              }}
            >
              Delete
            </button>
          </div>
          <div className="notificationCard">
            <p className="notificationMessage">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
              unde dolor maiores quam quia quos? Saepe praesentium porro
              necessitatibus
              impeditaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!
            </p>
            <p className="notificationTime">Lorem ipsum</p>
            <button
              className="createStoryButton deleteNotificationHover"
              style={{
                maxHeight: "1.65rem",
                minHeight: "1.65rem",
                marginTop: "0.2rem",
                marginBottom: "0.2rem",
                maxWidth: "90%",
              }}
            >
              Delete
            </button>
          </div>
          <div className="notificationCard">
            <p className="notificationMessage">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
              unde dolor maiores quam quia quos? Saepe praesentium porro
              necessitatibus
              impeditaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!
            </p>
            <p className="notificationTime">Lorem ipsum</p>
            <button
              className="createStoryButton deleteNotificationHover"
              style={{
                maxHeight: "1.65rem",
                minHeight: "1.65rem",
                marginTop: "0.2rem",
                marginBottom: "0.2rem",
                maxWidth: "90%",
              }}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="createPostSecondRow">
          <button className={"createPostButton buttonHover"}>
            Delete All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
