import React from "react";
import "./MainPage.css";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../components/Home";
import { Routes, Route } from "react-router-dom";
import Posts from "../components/Posts";
import Groups from "../components/Groups";
import Friends from "../components/Friends";
import Help from "../components/Help";

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
        <Routes>
          <Route
            path="/"
            element={
              <div className="mainComponent">
                {" "}
                <Home />{" "}
              </div>
            }
          />
          <Route
            path="/posts"
            element={
              <div className="mainComponent">
                {" "}
                <Posts />{" "}
              </div>
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
          <Route
            path="/friends"
            element={
              <div className="mainComponent">
                {" "}
                <Friends />{" "}
              </div>
            }
          />
          <Route
            path="/help"
            element={
              <div className="mainComponent">
                {" "}
                <Help />{" "}
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default MainPage;
