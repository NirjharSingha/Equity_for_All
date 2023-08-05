import React from "react";
import "./Home.css";
import { useEffect } from "react";
import PersonCard from "./PersonCard";

const Home = () => {
  useEffect(() => {
    console.log("home component loaded");
  }, []);

  return (
    <div className="homeDiv">
      <div className="homeContainer">
        <PersonCard />
      </div>
    </div>
  );
};

export default Home;
