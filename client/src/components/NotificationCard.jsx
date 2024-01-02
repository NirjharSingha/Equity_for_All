import React from "react";

const NotificationCard = ({ notification, deleteOne }) => {
  const { message, time } = notification;

  return (
    <div className="notificationCard">
      <p className="notificationMessage">{message}</p>
      <p className="notificationTime">{time}</p>
      <button
        className="createStoryButton deleteNotificationHover"
        style={{
          maxHeight: "1.65rem",
          minHeight: "1.65rem",
          marginTop: "0.2rem",
          marginBottom: "0.2rem",
          maxWidth: "90%",
        }}
        onClick={deleteOne}
      >
        Delete
      </button>
    </div>
  );
};

export default NotificationCard;
