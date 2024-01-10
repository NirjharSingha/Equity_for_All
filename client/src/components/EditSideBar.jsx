import React, { useRef, useEffect } from "react";

const EditSideBar = ({ containerClass, handler_1, handler_2, setShowEdit }) => {
  const editContainerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        editContainerRef.current &&
        !editContainerRef.current.contains(event.target)
      ) {
        setShowEdit(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={containerClass} ref={editContainerRef}>
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
