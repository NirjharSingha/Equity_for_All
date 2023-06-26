import React from "react";
import "./Home.css";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    console.log("help component loaded");
  }, []);

  return (
    <div className="homeDiv">
      <div className="homeContainer">
        <h1>Help page</h1>
      </div>
    </div>
  );
};

export default Home;
