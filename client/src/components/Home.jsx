import React from "react";
import "./Home.css";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    console.log("home component loaded");
  }, []);

  return (
    <div className="homeDiv">
      <div className="homeContainer">
        <h1></h1>
      </div>
    </div>
  );
};

export default Home;
