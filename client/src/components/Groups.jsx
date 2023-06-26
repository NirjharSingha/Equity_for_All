import React from "react";
import "./Home.css";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    console.log("group component loaded");
  }, []);

  return (
    <div className="homeDiv">
      <div className="homeContainer">
        <h1>Group page</h1>
      </div>
    </div>
  );
};

export default Home;
