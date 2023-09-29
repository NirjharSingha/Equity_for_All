import React from "react";

const UserSession = () => {
  return (
    <div className="fullScreenBlur" style={{ zIndex: "990" }}>
      <div className="confirmWindow">
        <p className="confirmDesc userSessionText">
          Your current session is over.
          <br />
          You need to log in again.
        </p>
        <button className="goToLogin">Log in again</button>
      </div>
    </div>
  );
};

export default UserSession;
