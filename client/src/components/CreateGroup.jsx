import React from "react";
import "./CreateGroup.css";
import ItemCard from "./ItemCard";
import { useEffect } from "react";
import { useState, useRef } from "react";
import axios from "axios";
import { useFileContext } from "../contexts/FileContext";
import { useGlobals } from "../contexts/Globals";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { useGroupContext } from "../contexts/GroupContext";
import jwtDecode from "jwt-decode";

const CreateGroup = () => {
  const { setIsValidJWT } = useGlobals();
  const { deleteFile } = useFileContext();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState({});
  const [groupName, setGroupName] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [privacy, setPrivacy] = useState("");
  const { getUserInfo } = useUserInfoContext();
  const [userName, setUserName] = useState("User Name");
  const [userImg, setUserImg] = useState("");
  const [crossFlag, setCrossFlag] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const { setShowCreateGroup } = useGroupContext();

  const handleButtonClick = () => {
    if (!crossFlag) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCrossFlag(true);
    setImgUrl(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedFile(reader.result);
    };
  };

  useEffect(() => {
    if (groupName === "" || privacy === "") {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [groupName, privacy]);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    const groupData = new FormData();
    groupData.append("groupName", groupName);
    groupData.append("groupVisibility", privacy);
    groupData.append("backgroundImage", imgUrl);
    groupData.append("createdAt", new Date(Date.now()).toLocaleString());

    try {
      const token = localStorage.getItem("token");
      let response;
      response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/group/createGroup`,
        groupData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );
      if (response) {
        console.log("group created successfully");
        setShowCreateGroup(false);
      }
    } catch (error) {
      console.log(error);
      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        console.log("inside status code");
        setIsValidJWT(false);
      }
      console.log(error);
    }
  };
  useEffect(() => {
    const displayGroupAdmin = async () => {
      const { name, profilePic } = await getUserInfo(
        jwtDecode(localStorage.getItem("token")).email
      );
      setUserName(name), setUserImg(profilePic);
    };
    displayGroupAdmin();
  }, []);
  return (
    <div className="blurComponent">
      <div className="editPostCross" onClick={() => setShowCreateGroup(false)}>
        X
      </div>
      <form
        className="CreateGroup"
        onSubmit={handleCreateGroup}
        encType="multipart/form-data"
      >
        <div
          className="createPostFirstRow"
          style={{ maxHeight: `calc(100vh - 14rem)` }}
        >
          <ItemCard
            containerClass="groupAdmin"
            imgClass="storyProfilePic"
            nameClass="optionListName"
            shouldDisplayImg={userImg !== ""}
            imgSrc={userImg}
            icon="/profilePicIcon.svg"
            name={`${userName}(Admin)`}
          />
          <input
            type="text"
            placeholder="Group Name"
            className="groupInput"
            value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
          />
          <select
            id="privacy"
            name="privacy"
            className="groupInput"
            value={privacy}
            onChange={(event) => setPrivacy(event.target.value)}
          >
            <option value="">Select Privacy</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <input
            type="file"
            name="groupBgImg"
            className="postAttachmentInput"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <img
            src={crossFlag ? selectedFile : "/group.png"}
            className="groupImg"
          ></img>
          <button
            type="button"
            className="uploadPostAttachment uploadGroupBg"
            style={{ width: "100%" }}
            onClick={handleButtonClick}
          >
            {!crossFlag ? "Attach background image" : "image uploaded"}
            {crossFlag && (
              <div
                className="fileUploadCross"
                onClick={() => {
                  setSelectedFile({});
                  setCrossFlag(false);
                }}
              >
                x
              </div>
            )}
          </button>
        </div>
        <button
          type="submit"
          className={
            isDisable
              ? "createGroupBtn disabledCreatePost"
              : "createGroupBtn buttonHover"
          }
          disabled={isDisable}
        >
          Create Group
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;
