import React from "react";
import { useGlobals } from "../contexts/Globals";

const CountIcon = ({ count }) => {
  const { windowWidth } = useGlobals();
  const notificationStyle = {
    borderRadius: "50%",
    backgroundColor: "red",
    minHeight: "1.3rem",
    maxHeight: "1.3rem",
    minWidth: "1.3rem",
    maxWidth: "1.3rem",
    color: "white",
    fontSize: "0.7rem",
    border: "1px solid white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const additionalStyle = {
    position: "absolute",
    bottom: "0",
    right: "0",
  };

  return (
    <div
      style={
        windowWidth >= 800
          ? {
              ...additionalStyle,
              ...notificationStyle,
            }
          : {
              ...notificationStyle,
            }
      }
    >
      {count}
    </div>
  );
};

export default CountIcon;
