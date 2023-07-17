import React from "react";
import { useEffect } from "react";
import Share from "./Share";

const Chat = () => {
  useEffect(() => {
    console.log("chat component loaded");
  }, []);
  return <div></div>;
};

export default Chat;
