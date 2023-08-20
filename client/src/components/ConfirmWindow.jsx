import React from "react";
import "./ConfirmWindow.css";

const ConfirmWindow = ({
  handleAction,
  setShowConfirm,
  flag,
  isConfirmWindow,
  messageToShow,
}) => {
  return (
    <div className="fullScreenBlur">
      <div className="confirmWindow">
        <div className="confirmCrossContainer">
          <div className="confirmCross" onClick={() => setShowConfirm(false)}>
            X
          </div>
        </div>
        <div className="confirmDesc">
          {isConfirmWindow && (
            <>
              <p>{`This ${flag} will be deleted permanently.`}</p>
              <p>Are you sure to proceed?</p>
            </>
          )}
          {!isConfirmWindow && <p>{messageToShow}</p>}
        </div>
        {isConfirmWindow && (
          <div className="confirmButtonsContainer">
            <button
              className="confirmButton"
              onClick={() => setShowConfirm(false)}
            >
              No
            </button>
            <button
              className="confirmButton"
              onClick={() => {
                handleAction();
                setShowConfirm(false);
              }}
            >
              Yes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmWindow;
