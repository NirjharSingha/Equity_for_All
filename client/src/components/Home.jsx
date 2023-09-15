import React from "react";
import "./Home.css";
import { useEffect, lazy, Suspense } from "react";

const WelcomeCard = lazy(() => import("./WelcomeCard"));

const Home = () => {
  useEffect(() => {
    console.log("home component loaded");
  }, []);

  return (
    <div className="homeDiv">
      <div className="homeContainer">
        <Suspense fallback={<div>Loading...</div>}>
          <WelcomeCard />
        </Suspense>
        <h1 className="storyHeading">Top stories for you</h1>
        <div className="homeStories"></div>
      </div>
    </div>
  );
};

export default Home;
