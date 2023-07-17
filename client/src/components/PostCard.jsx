import React, { useState, useEffect, useRef } from "react";
import "./PostCard.css";
import { AiFillLike, AiOutlineLike, AiFillDislike } from "react-icons/ai";
import { FaLaughSquint, FaSadCry, FaAngry, FaComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { PiShareFatBold } from "react-icons/pi";
import AllLikes from "./AllLikes";
import Comment from "./Comment";

const PostCard = ({ setShowPostShare }) => {
  const [expanded, setExpanded] = useState(false);
  const [mouseOnLike, setMouseOnLike] = useState(false);
  const [mouseOnAllLikes, setMouseOnAllLikes] = useState(false);
  const [selected, setSelected] = useState("");
  const [shouldDisplayAllLikes, setShouldDisplayAllLikes] = useState(false);
  const imageRef = useRef(null);
  const [showComments, setShowComments] = useState(false);

  const toggleFullscreen = () => {
    const imageElement = imageRef.current;

    if (!document.fullscreenElement) {
      if (imageElement.requestFullscreen) {
        imageElement.requestFullscreen();
      } else if (imageElement.mozRequestFullScreen) {
        // Firefox
        imageElement.mozRequestFullScreen();
      } else if (imageElement.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        imageElement.webkitRequestFullscreen();
      } else if (imageElement.msRequestFullscreen) {
        // IE/Edge
        imageElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleMouseLeaveFromLike = () => {
    setTimeout(() => {
      setMouseOnLike(false);
    }, 500);
  };

  useEffect(() => {
    if (!mouseOnAllLikes && !mouseOnLike) {
      setShouldDisplayAllLikes(false);
    }
  }, [mouseOnAllLikes, mouseOnLike]);

  const handleSeeMore = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <>
      {showComments && <Comment setShowComments={setShowComments} />}
      <div className="postCard">
        <div className="postHeading">
          <img
            src="http://localhost:5000/uploads/1688751295691-database.png"
            alt=""
            className="postUserProfilePic"
          />
          <h2 className="postUserName">User Name</h2>
        </div>
        <div className={expanded ? "expandedPostContent" : "postContent"}>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident
            ipsa aperiam error totam facere consequuntur dolorum? Natus
            reiciendis id, sequi quo quaerat, et voluptas vitae iure voluptate
            consequuntur odio asperiores! Expedita corporis animi at amet
            dignissimos nemo exercitationem vitae repellat non veniam nobis enim
            magni et delectus fugit voluptatibus accusantium natus incidunt ipsa
            ad sed, nihil neque eum id! Ad rerum placeat dicta fugiat, at
            dolorem consectetur soluta temporibus quasi impedit qui delectus
            esse atque cumque porro sit accusantium perspiciatis rem. Maxime,
            dolore? Animi nam cumque itaque, natus est at minus, nisi veritatis
            aspernatur aliquid saepe nesciunt autem adipisci eligendi et odit,
            recusandae tempora vitae id. Assumenda, repudiandae ea sunt porro
            doloremque error sapiente autem sed, eligendi beatae, magnam culpa
            commodi consequuntur dolorem odio recusandae voluptatem eius.
            Numquam modi sint aliquam veritatis est ipsam ducimus? Consectetur
            ad aspernatur id. Pariatur culpa nostrum et dignissimos unde
            mollitia magni tenetur, debitis hic sapiente? Maxime nihil explicabo
            molestias velit debitis eligendi temporibus facilis ea nisi optio
            dolore nam commodi sed delectus assumenda modi doloremque
            repudiandae, iusto ab expedita dolorem magni ducimus fuga officia!
            Repudiandae qui incidunt eos adipisci voluptatem eius vitae cum
            consequuntur nobis velit? Non quisquam eius sapiente quis quasi,
            quidem exercitationem. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Ad, velit dolor! Aliquid voluptas praesentium
            molestiae aut. Suscipit libero vel, neque laboriosam odit pariatur
            consectetur ullam rerum architecto eaque! Fugit, laboriosam? Lorem
            ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis
            quibusdam nostrum officiis fugiat laudantium impedit provident!
            Accusamus, quam eum assumenda provident totam praesentium quidem
            expedita facere consectetur, repellat ipsa incidunt ad qui
            molestiae, culpa quaerat nemo. Quibusdam officia alias voluptas?
            Iste dolore aliquid, sequi odit vel commodi dolorum quae modi
            ratione. Commodi exercitationem, optio totam earum atque quasi ut
            ipsam est magni inventore at excepturi cupiditate quaerat odit vitae
            beatae libero voluptates, labore, impedit dolor. Est nesciunt
            quaerat accusamus dolorem? Quasi, autem. Accusantium commodi sit
            fuga possimus rerum ut expedita aliquid numquam tempora? Delectus
            officiis dicta recusandae error, veritatis excepturi, quidem officia
            dignissimos doloremque, veniam earum unde nam optio. Saepe
            exercitationem fugit ducimus recusandae provident, sed magni dolorum
            consequatur sunt repellendus enim adipisci odio alias hic autem
            magnam vel sint quidem a voluptatem, corporis error blanditiis. A
            explicabo doloremque molestias eos tenetur. Vitae dolor
            necessitatibus voluptates, odio consectetur deleniti voluptate in
            cum nesciunt nostrum at error est eligendi facere totam non tenetur
            consequatur iusto! Non et ullam laudantium eum cumque cupiditate,
            doloremque ducimus, aperiam omnis eligendi iure natus incidunt
            quisquam quas sit! Tempora sapiente sit molestias neque enim
            tempore? Vero libero exercitationem ab laudantium amet excepturi
            soluta velit quis consequatur.
          </p>
          <img
            src="http://localhost:5000/uploads/1688751295691-database.png"
            alt=""
            width={200}
            height={200}
            ref={imageRef}
            onClick={toggleFullscreen}
            className="postFiles"
          />
          <video
            src="http://localhost:5000/uploads/video1089712846.mp4"
            width={200}
            height={200}
            controls
            className="postFiles"
          ></video>
        </div>
        <div className="thirdRow">
          <div
            className="allLikes"
            onMouseEnter={() => {
              setMouseOnAllLikes(true);
            }}
            onMouseLeave={() => setMouseOnAllLikes(false)}
          >
            {shouldDisplayAllLikes && (mouseOnAllLikes || mouseOnLike) && (
              <AllLikes
                setSelected={setSelected}
                setShouldDisplayAllLikes={setShouldDisplayAllLikes}
                isCommentPage={false}
              />
            )}
          </div>
          <div className="seeMore">
            <button className="seeMoreButton" onClick={handleSeeMore}>
              {expanded ? "See Less" : "See More"}
            </button>{" "}
          </div>
        </div>
        <div className="postOptions">
          <div
            className="likeContainer flexContainerPost"
            onMouseEnter={() => {
              setMouseOnLike(true);
              setShouldDisplayAllLikes(true);
            }}
            onMouseLeave={handleMouseLeaveFromLike}
            onClick={() => setSelected("")}
          >
            {selected === "Like" ? (
              <AiFillLike className="iconFlex blue" />
            ) : selected === "Dislike" ? (
              <AiFillDislike className="iconFlex blue" />
            ) : selected === "Laugh" ? (
              <FaLaughSquint className="iconFlex yellow" />
            ) : selected === "Angry" ? (
              <FaAngry className="iconFlex red" />
            ) : selected === "Sad" ? (
              <FaSadCry className="iconFlex yellow" />
            ) : selected === "Love" ? (
              <FcLike className="iconFlex" />
            ) : (
              <AiOutlineLike className="likeIcon iconFlex" />
            )}{" "}
            <span className="postOptionText">
              {selected === "" ? "Like" : ""}
            </span>
          </div>
          <div className="commentIcon" onClick={() => setShowComments(true)}>
            <FaComment className="iconFlex gray" />
            <span>Comment</span>
          </div>
          <div
            className="shareIcon"
            onClick={() => setShowPostShare((prev) => !prev)}
          >
            <PiShareFatBold className="iconFlex" />
            <span>Share</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
