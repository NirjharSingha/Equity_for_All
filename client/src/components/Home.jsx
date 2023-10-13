import React from "react";
import "./Home.css";
import { useEffect, lazy, Suspense } from "react";
import Story from "./Story";

const Animation = lazy(() => import("./Animation"));

const Home = () => {
  useEffect(() => {
    console.log("home component loaded");
  }, []);

  return (
    <div className="homeDiv">
      <div className="homeContainer">
        <Suspense fallback={<div>Loading...</div>}>
          <Animation />
        </Suspense>
        <h1 className="storyHeading">Top stories for you</h1>
        <Story />
      </div>
    </div>
  );
};

export default Home;
