import React from "react";
import "./MainPage.css";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../components/Home";
import { Routes, Route } from "react-router-dom";
import Groups from "../components/Groups";
import Friends from "../components/Friends";
import Profile from "../components/Profile";
import Chat from "../components/Chat";
import PostComponent from "../components/PostComponent";
import FriendOptions from "../components/FriendOptions";
import CreateStory from "../components/CreateStory";
import { useGlobals } from "../contexts/Globals";
import { usePostContext } from "../contexts/PostContext";
import { useGroupContext } from "../contexts/GroupContext";
import { useFriendContext } from "../contexts/FriendContext";
import UserSession from "../components/UserSession";
import PreviewStory from "../components/PreviewStory";
import DisplayStory from "../components/DisplayStory";
import GroupsBar from "../components/GroupsBar";
import EditPost from "../components/EditPost";
import CreateStoryMobile from "../components/CreateStoryMobile";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Notification from "../components/Notification";

const MainPage = () => {
  const { isValidJWT, windowWidth, showNotifications, setWindowWidth } =
    useGlobals();
  const { editPost } = usePostContext();
  const { groupsYouCreated, groupsYouJoined, selectedGroup, setAccess } =
    useGroupContext();
  const navigate = useNavigate();
  const { divRef } = useFriendContext();

  useEffect(() => {
    let foundGroup = null;
    console.log("inside access");

    if (selectedGroup) {
      for (let index = 0; index < groupsYouCreated.length; index++) {
        const element = groupsYouCreated[index];
        if (element._id === selectedGroup._id) {
          foundGroup = element;
          break;
        }
      }
    }

    if (foundGroup) {
      setAccess(1);
    } else {
      if (selectedGroup) {
        for (let index = 0; index < groupsYouJoined.length; index++) {
          const element = groupsYouJoined[index];
          if (element._id === selectedGroup._id) {
            foundGroup = element;
            break;
          }
        }
      }

      if (foundGroup) {
        setAccess(2);
      } else {
        if (selectedGroup && selectedGroup.groupVisibility === "public") {
          setAccess(3);
        } else {
          setAccess(0);
        }
      }
    }

    if (selectedGroup === null) {
      if (windowWidth < 800) {
        const currentUrl = window.location.href;
        if (currentUrl === `${import.meta.env.VITE_CLIENT_URL}main/groups/id`) {
          navigate("/main/groups");
        }
      }
    }
  }, [selectedGroup]);

  useEffect(() => {
    if (windowWidth > 800) {
      const currentUrl = window.location.href;
      if (currentUrl === `${import.meta.env.VITE_CLIENT_URL}main/yourProfile`) {
        navigate("/main");
      }
    }
  }, [windowWidth]);

  useEffect(() => {
    const handleNotification = async (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
    };

    const email = jwtDecode(localStorage.getItem("token")).email;
    const eventSource = new EventSource(
      `${import.meta.env.VITE_SERVER_URL}/api/SSE?id=${email}`
    );

    eventSource.addEventListener("message", handleNotification);

    return () => {
      eventSource.removeEventListener("message", handleNotification);
      eventSource.close();
    };
  }, []);

  return (
    <>
      {editPost && <EditPost />}
      {!isValidJWT && <UserSession />}
      {showNotifications && <Notification />}
      <div className="mainPage">
        <div className="navComponent">
          <Navbar />
        </div>
        <div className="footerComponent">
          <Footer />
        </div>
        <div className="mainContainer">
          {windowWidth >= 1150 && (
            <div className="chatComponent">
              <Chat />
            </div>
          )}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div
                    className="mainComponent"
                    style={{ overflowY: "hidden" }}
                  >
                    <Home />
                  </div>
                  {windowWidth >= 800 && (
                    <div className="leftComponent">
                      <Profile profileCode={0} />
                    </div>
                  )}
                </>
              }
            />
            <Route
              path="/posts/*"
              element={
                <div className="doubleColumn">
                  <PostComponent />
                </div>
              }
            />
            <Route
              path="/friends"
              element={
                <>
                  <div
                    className="mainComponent"
                    style={{ overflowY: "hidden" }}
                  >
                    <div className="friendMain" ref={divRef}>
                      {windowWidth < 800 && <FriendOptions />}
                      <Friends />
                    </div>
                  </div>
                  {windowWidth >= 800 && (
                    <div className="leftComponent">
                      <FriendOptions />
                    </div>
                  )}
                </>
              }
            />
            <Route
              path="/groups"
              element={
                <>
                  {windowWidth >= 800 && (
                    <>
                      <div className="mainComponent">
                        <Groups />
                      </div>
                      <div className="leftComponent">
                        <GroupsBar />
                      </div>
                    </>
                  )}
                  {windowWidth < 800 && (
                    <div
                      className="mainComponent"
                      style={{ overflowY: "hidden" }}
                    >
                      <GroupsBar />
                    </div>
                  )}
                </>
              }
            />
            <Route
              path="/groups/id"
              element={
                <div className="mainComponent" style={{ overflowY: "hidden" }}>
                  <Groups />
                </div>
              }
            />
            <Route
              path="/stories"
              element={
                <div className="doubleColumn">
                  <DisplayStory />
                </div>
              }
            />
            <Route
              path="/createStory"
              element={
                windowWidth > 800 ? (
                  <>
                    <div className="mainComponent">
                      <PreviewStory />
                    </div>
                    <div className="leftComponent">
                      <CreateStory />
                    </div>
                  </>
                ) : (
                  <>
                    <CreateStoryMobile />
                  </>
                )
              }
            />
            <Route
              path="/yourProfile"
              element={
                <>
                  <div
                    className="mainComponent"
                    style={{ overflowY: "hidden" }}
                  >
                    <Profile profileCode={0} />
                  </div>
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default MainPage;
