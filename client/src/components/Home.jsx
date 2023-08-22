import React from "react";
import "./Home.css";
import { useEffect } from "react";
import BirthDays from "./BirthDays";
const Home = () => {
  useEffect(() => {
    console.log("home component loaded");
  }, []);

  return (
    <div className="homeDiv">
      <div className="homeContainer">
        <BirthDays />
      </div>
    </div>
  );
};

export default Home;
