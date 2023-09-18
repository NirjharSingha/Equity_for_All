import React from "react";
import "./Groups.css";
import { useEffect } from "react";
import Loading from "./Loading";

const Home = () => {
  useEffect(() => {
    console.log("group component loaded");
  }, []);

  return (
    <div className="homeDiv">
      <div className="homeContainer">
        <h1>Group page</h1>
        <Loading />
      </div>
    </div>
  );
};

export default Home;
