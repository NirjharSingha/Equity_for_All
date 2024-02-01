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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Notification from "../components/Notification";
import axios from "axios";
import io from "socket.io-client";
import { useChat } from "../contexts/ChatContext";
import { useUserInfoContext } from "../contexts/UserInfoContext";

let socket;
const ENDPOINT = import.meta.env.VITE_SERVER_URL;

const MainPage = () => {
  const {
    setIsValidJWT,
    isValidJWT,
    windowWidth,
    showNotifications,
    unseenNotificationCount,
    setUnseenNotificationCount,
  } = useGlobals();
  const { editPost } = usePostContext();
  const { groupsYouCreated, groupsYouJoined, selectedGroup, setAccess } =
    useGroupContext();
  const { chats, unreadChat, setUnreadChat, setChatUsers } = useChat();
  const [globalSocketChat, setGlobalSocketChat] = useState({});
  const { getUserInfo } = useUserInfoContext();

  const navigate = useNavigate();
  const { divRef } = useFriendContext();

  useEffect(() => {
    let foundGroup = null;

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
      if (
        currentUrl === `${import.meta.env.VITE_CLIENT_URL}main/yourProfile` ||
        (currentUrl === `${import.meta.env.VITE_CLIENT_URL}main/chat` &&
          windowWidth > 1150)
      ) {
        navigate("/main");
      }
    }
  }, [windowWidth]);

  useEffect(() => {
    const handleNotification = async (event) => {
      const data = JSON.parse(event.data);
      alert(data);
      setUnseenNotificationCount((prev) => prev + 1);
    };

    const email = jwtDecode(localStorage.getItem("token")).email;
    const eventSource = new EventSource(
      `${import.meta.env.VITE_SERVER_URL}/api/SSE?id=${email}`
    );

    eventSource.addEventListener("message", handleNotification);

    const unseenNotificationCount = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/notification/countUnseen`,
          {
            headers: {
              token: token,
            },
          }
        );
        if (response) {
          setUnseenNotificationCount(response.data);
          if (response.data > 0) {
            alert(`You have ${response.data} new notifications`);
          }
        }
      } catch (error) {
        if (error.response.status === 401) {
          setIsValidJWT(false);
        }
      }
    };

    unseenNotificationCount();

    return () => {
      eventSource.removeEventListener("message", handleNotification);
      eventSource.close();
    };
  }, []);

  // socket setup
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("connect", () => {});
    socket.emit(
      "global_chat_socket",
      jwtDecode(localStorage.getItem("token")).email
    );

    socket.on("global_receive_message", (newMessageRecieved) => {
      setGlobalSocketChat(newMessageRecieved.chat);
    });
  }, []);

  const handleProcess = async () => {
    setUnreadChat((prev) => {
      const senderExists = prev.some(
        (item) => item.sender === globalSocketChat.sender
      );
      if (senderExists) {
        return prev.map((item) =>
          item.sender === globalSocketChat.sender
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        return [...prev, { sender: globalSocketChat.sender, count: 1 }];
      }
    });
    setChatUsers((prev) => {
      const senderIndex = prev.findIndex(
        (user) => user.id === globalSocketChat.sender
      );

      if (senderIndex !== -1) {
        const updatedUser = {
          ...prev[senderIndex],
          unreadCount: prev[senderIndex].unreadCount + 1,
        };
        const updatedArray = [
          updatedUser,
          ...prev.slice(0, senderIndex),
          ...prev.slice(senderIndex + 1),
        ];

        return updatedArray;
      } else {
        const { name, profilePic } = getUserInfo(globalSocketChat.sender);
        return [
          {
            id: globalSocketChat.sender,
            unreadCount: 1,
            name: name,
            profilePic: profilePic,
          },
          ...prev,
        ];
      }
    });
  };

  useEffect(() => {
    if (globalSocketChat._id !== undefined && globalSocketChat._id !== null) {
      if (chats.length > 0) {
        const tempChat = chats[0];
        const { sender, receiver } = tempChat;
        let targetUser;
        if (jwtDecode(localStorage.getItem("token")).email === sender) {
          targetUser = receiver;
        } else {
          targetUser = sender;
        }
        if (targetUser === globalSocketChat.sender) {
          return;
        } else {
          handleProcess();
        }
      } else {
        handleProcess();
      }
    }
  }, [globalSocketChat._id]);

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
            <Route
              path="/chat"
              element={
                <>
                  <div
                    className={
                      windowWidth > 500 ? "leftComponent" : "mainComponent"
                    }
                  >
                    <Chat />
                  </div>
                  {windowWidth > 800 && windowWidth < 1150 && (
                    <div
                      className="mainComponent"
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
                        fontFamily: "sans",
                      }}
                    >
                      Select a chat to view
                    </div>
                  )}
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
