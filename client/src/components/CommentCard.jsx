import React from "react";
import { useEffect, useState, useRef } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BsFillReplyFill, BsEmojiSmile } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BiSolidSend } from "react-icons/bi";
import "./CommentCard.css";

const CommentCard = () => {
  const [showReply, setShowReply] = useState(false);

  return (
    <>
      <div className="comment">
        <div className="commentFirstRow">
          <img
            src="http://localhost:5000/uploads/1688751295691-database.png"
            alt=""
            className="commentUserProfilePic"
          />
          <h3 className="commentUserName">User name</h3>
        </div>
        <div className="commentSecondRow">
          {new Date(Date.now()).toLocaleString()}
        </div>
        <div className="commentThirdRow">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo
          optio laudantium error dolor consequatur facilis repellat, molestias
          quasi ut tenetur facere sapiente ipsam? Temporibus architecto quos
          iure quisquam at cupiditate nostrum quae? Ex nulla reprehenderit vitae
          facere amet sit fugit nobis ratione! Culpa temporibus eum molestias
          placeat delectus nobis illo!
        </div>
        <div className="commentForthRow">
          <AiOutlineLike className="commentIcons blue" />
          <BsFillReplyFill
            className="commentIcons blue"
            onClick={() => setShowReply((prev) => !prev)}
          />
          <FaEdit className="commentIcons blue" />
          <MdDelete className="commentIcons blue" />
        </div>
      </div>
      {showReply && (
        <div className="commentFifthRow">
          <BsEmojiSmile className="commentEmojiIcon" />
          <input type="text" className="commentReply" />
          <BiSolidSend className="commentSubmitIcon" />
        </div>
      )}
    </>
  );
};

export default CommentCard;
