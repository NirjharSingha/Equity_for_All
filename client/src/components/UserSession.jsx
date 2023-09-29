import React from "react";

const UserSession = () => {
  const handleGoToLogin = () => {
    localStorage.removeItem("token");
    window.location.href = "http://localhost:5173/";
  };
  return (
    <div className="fullScreenBlur" style={{ zIndex: "990" }}>
      <div className="confirmWindow">
        <p className="confirmDesc userSessionText">
          Your current session is over.
          <br />
          You need to log in again.
        </p>
        <button className="goToLogin" onClick={handleGoToLogin}>
          Log in again
        </button>
      </div>
    </div>
  );
};

export default UserSession;
