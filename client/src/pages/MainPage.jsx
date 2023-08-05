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

const MainPage = () => {
  return (
    <div className="mainPage">
      <div className="navComponent">
        <Navbar />
      </div>
      <div className="footerComponent">
        <Footer />
      </div>
      <div className="mainContainer">
        <div className="chatComponent">
          <Chat />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="mainComponent">
                  {" "}
                  <Home />{" "}
                </div>
                <div className="leftComponent">
                  <Profile />
                </div>
              </>
            }
          />
          <Route
            path="/posts/*"
            element={
              <div className="doubleColumn">
                {" "}
                <PostComponent />{" "}
              </div>
            }
          />
          <Route
            path="/friends"
            element={
              <>
                <div className="mainComponent">
                  {" "}
                  <Friends />{" "}
                </div>
                <div className="leftComponent">
                  <Profile />
                </div>
              </>
            }
          />
          <Route
            path="/groups"
            element={
              <div className="mainComponent">
                {" "}
                <Groups />{" "}
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default MainPage;
