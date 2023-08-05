import React from "react";
import "./Friends.css";
import { useEffect } from "react";
import PersonCard from "./PersonCard";

const Home = () => {
  useEffect(() => {
    console.log("friend component loaded");
  }, []);

  return (
    <div className="friendDiv">
      <div className="friendContainer">
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
        <div className="personFlex">
          <PersonCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
