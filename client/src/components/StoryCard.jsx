import React from "react";
import "./StoryCard.css";
import { useStoryContext } from "../contexts/StoryContext";
import { useState, useEffect } from "react";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const StoryCard = ({ story }) => {
  const navigate = useNavigate();
  const { setKeyIndex, storyKeys, setValueIndex } = useStoryContext();
  const { getUserInfo } = useUserInfoContext();
  const [userName, setUserName] = useState("User Name");
  const [userImg, setUserImg] = useState("");
  let paragraphs;
  if (story.storyDescription !== undefined) {
    paragraphs = story.storyDescription.split("\n").map((paragraph, index) => (
      <React.Fragment key={index}>
        <p>{paragraph}</p>
      </React.Fragment>
    ));
  }
  const email = jwtDecode(localStorage.getItem("token")).email;
  const { setStoryToDisplay } = useStoryContext();

  useEffect(() => {
    const displayStoryUser = async () => {
      const { name, profilePic } = await getUserInfo(story.userEmail);
      setUserName(name), setUserImg(profilePic);
    };

    displayStoryUser();
  }, []);

  return (
    <div
      className="storyCard"
      onClick={() => {
        setStoryToDisplay(story);
        setKeyIndex(storyKeys.indexOf(story.userEmail));
        setValueIndex(0);
        navigate("/main/stories");
      }}
    >
      <div className="storyCardHeading">
        {userImg !== "" && (
          <img src={userImg} alt="" className="storyProfilePic" />
        )}
        {userImg === "" && (
          <img
            src="/profilePicIcon.svg" // Use the path to the SVG in the public folder
            alt=""
            className="storyProfilePic"
          />
        )}
        <p>{email === story.userEmail ? "Your story" : userName}</p>
      </div>
      <div
        className="storyCardPreview"
        style={
          story.backgroundImage === ""
            ? { backgroundColor: story.backgroundColor }
            : {
                backgroundImage: `url(${story.backgroundImage})`,
                backgroundColor: "rgb(41, 40, 40)",
              }
        }
      >
        <span
          className="storySpan"
          style={{
            fontStyle: story.fontStyle === "fancy" ? "italic" : "normal",
            color: story.fontColor,
          }}
        >
          {paragraphs}
        </span>
      </div>
    </div>
  );
};

export default StoryCard;
