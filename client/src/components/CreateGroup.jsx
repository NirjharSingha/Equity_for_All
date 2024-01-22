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
  const {
    setShowCreateGroup,
    setGroupsYouCreated,
    setShowAlertMsg,
    setAlertMsg,
    isEditGroup,
    setIsEditGroup,
    groupToEdit,
    setGroupToEdit,
    selectedGroup,
  } = useGroupContext();
  const { setIsValidJWT, windowWidth } = useGlobals();
  const { deleteFile } = useFileContext();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState({});
  const [groupName, setGroupName] = useState(
    isEditGroup ? groupToEdit.groupName : ""
  );
  const [privacy, setPrivacy] = useState(
    isEditGroup ? groupToEdit.groupVisibility : ""
  );
  const { getUserInfo } = useUserInfoContext();
  const [userName, setUserName] = useState("User Name");
  const [userImg, setUserImg] = useState("");
  const [crossFlag, setCrossFlag] = useState(
    isEditGroup && groupToEdit.groupImage !== ""
  );
  const [imgUrl, setImgUrl] = useState("");
  const [isFirst, setIsFirst] = useState(
    isEditGroup && groupToEdit.groupImage !== ""
  );

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

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    const groupData = new FormData();
    groupData.append("groupName", groupName);
    groupData.append("groupVisibility", privacy);
    groupData.append("backgroundImage", imgUrl);
    if (!isEditGroup) {
      groupData.append("createdAt", new Date(Date.now()).toLocaleString());
    } else {
      groupData.append("updatedAt", new Date(Date.now()).toLocaleString());
      groupData.append("_id", groupToEdit._id);
      if (!isFirst && groupToEdit.groupImage !== "") {
        groupData.append("deleteFile", "deleted");
      }
    }

    try {
      const token = localStorage.getItem("token");
      let response;
      if (!isEditGroup) {
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
      } else {
        response = await axios.put(
          `${import.meta.env.VITE_SERVER_URL}/group/editGroup`,
          groupData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              token: token,
            },
          }
        );
      }
      if (response) {
        if (!isEditGroup) {
          console.log("group created successfully");
          setShowCreateGroup(false);
          setGroupsYouCreated((prev) => [...prev, response.data.group]);
          if (windowWidth < 800 || selectedGroup !== null) {
            setAlertMsg("Group Created successfully");
            setShowAlertMsg(true);
          }
        } else {
          setIsEditGroup(false);
          setGroupToEdit({});
          setGroupsYouCreated((prev) =>
            prev.map((group) =>
              group._id === response.data.updatedGroup._id
                ? response.data.updatedGroup
                : group
            )
          );
          if (windowWidth < 800 || selectedGroup !== null) {
            setAlertMsg("Group updated successfully");
            setShowAlertMsg(true);
          }
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
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
    <div className="fullScreenBlur">
      <div
        className="editPostCross"
        onClick={() => {
          setShowCreateGroup(false);
          setIsEditGroup(false);
          setGroupToEdit({});
        }}
      >
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
            required
          />
          <select
            id="privacy"
            name="privacy"
            className="groupInput"
            value={privacy}
            onChange={(event) => setPrivacy(event.target.value)}
            required
          >
            {!isEditGroup && <option value="">Select Privacy</option>}
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
            src={
              !isEditGroup
                ? crossFlag
                  ? selectedFile
                  : "/group.png"
                : isFirst
                ? groupToEdit.groupImage
                : imgUrl === ""
                ? "/group.png"
                : selectedFile
            }
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
                  setImgUrl("");
                  setCrossFlag(false);
                  setIsFirst(false);
                }}
              >
                x
              </div>
            )}
          </button>
        </div>
        <button type="submit" className={"createGroupBtn buttonHover"}>
          {isEditGroup ? "Update Group" : "Create Group"}
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;
