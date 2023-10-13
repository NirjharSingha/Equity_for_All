import React from "react";

const EditSideBar = ({
  containerClass,
  containerRef,
  handler_1,
  handler_2,
}) => {
  return (
    <div className={containerClass} ref={containerRef}>
      <div className="editOrDelete" onClick={handler_1}>
        Edit
      </div>
      <div className="editOrDelete" onClick={handler_2}>
        Delete
      </div>
    </div>
  );
};

export default EditSideBar;
