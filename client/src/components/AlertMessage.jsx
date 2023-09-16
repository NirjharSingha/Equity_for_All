import React from "react";
import "./AlertMessage.css";
import { useState } from "react";

const AlertMessage = ({ alertMessage, setState }) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <div className="alertBox">
        <div className="alertMessage">{alertMessage}</div>
        <div
          className="closeAlert"
          onClick={() => {
            setShow(false);
            setState(false);
          }}
        >
          x
        </div>
      </div>
    );
  }
  return null;
};

export default AlertMessage;
