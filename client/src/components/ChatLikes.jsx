import React, { useRef, useEffect } from "react";
import AllLikes from "./Likes";

const ChatLikes = ({ flag, setSelectedLike, setShouldDisplayAllLikes }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShouldDisplayAllLikes(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="chatSideBar"
      style={flag === 1 ? { left: "150px" } : { right: "-25px" }}
      ref={containerRef}
    >
      <AllLikes
        setSelected={setSelectedLike}
        setShouldDisplayAllLikes={setShouldDisplayAllLikes}
        isCommentPage={true}
      />
    </div>
  );
};

export default ChatLikes;
