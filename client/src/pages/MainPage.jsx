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
import UserSession from "../components/UserSession";
import PreviewStory from "../components/PreviewStory";
import DisplayStory from "../components/DisplayStory";
import GroupsBar from "../components/GroupsBar";
import EditPost from "../components/EditPost";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const { isValidJWT, windowWidth } = useGlobals();
  const { editPost } = usePostContext();
  const { groupsYouCreated, groupsYouJoined, selectedGroup, setAccess } =
    useGroupContext();
  const navigate = useNavigate();

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
        if (currentUrl === "http://localhost:5173/main/groups/id") {
          navigate("/main/groups");
        }
      }
    }
  }, [selectedGroup]);

  return (
    <>
      {editPost && <EditPost />}
      {!isValidJWT && <UserSession />}
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
                  <div className="mainComponent">
                    <Home />
                  </div>
                  <div className="leftComponent">
                    <Profile profileCode={0} />
                  </div>
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
                  <div className="mainComponent">
                    <Friends />
                  </div>
                  <div className="leftComponent">
                    <FriendOptions />
                  </div>
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
                    <div className="mainComponent">
                      <GroupsBar />
                    </div>
                  )}
                </>
              }
            />
            <Route
              path="/groups/id"
              element={
                <div className="mainComponent">
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
                <>
                  <div className="mainComponent">
                    <PreviewStory />
                  </div>
                  <div className="leftComponent">
                    <CreateStory />
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
