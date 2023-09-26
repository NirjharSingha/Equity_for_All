import React, { useEffect } from "react";
import "./CreatePost.css";
import { useState, useRef } from "react";
import EmojiList from "./EmojiList";
import PreviewItem from "./PreviewItem";
import axios from "axios";
import { usePostContext } from "../contexts/PostContext";

const CreatePost = () => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [postCategory, setPostCategory] = useState("public");
  const { editPost, setEditPost } = usePostContext();
  const [isDeleted, setIsDeleted] = useState(false);
  const {
    setYourPostArray,
    selectedPost,
    setShowYourPost,
    setShowAlert,
    setAlertMessage,
    showYourPost,
  } = usePostContext();
  const inputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (editPost) {
      setInputValue(selectedPost.postDescription);
      setPostCategory(selectedPost.postCategory);
    }
    if (
      editPost &&
      selectedPost &&
      selectedPost.postAttachments &&
      selectedPost.postAttachments.length === 0
    ) {
      setIsDeleted(true);
    }
  }, []);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  useEffect(() => {
    if (inputValue === "" && selectedFiles.length === 0) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [inputValue, selectedFiles]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const postData = new FormData();

    postData.append("postDescription", inputValue);
    postData.append("postCategory", postCategory);

    if (!editPost) {
      postData.append("createdAt", new Date(Date.now()).toLocaleString());
    }

    if (editPost) {
      postData.append("updatedAt", new Date(Date.now()).toLocaleString());
      postData.append("id", selectedPost._id);
      postData.append("isDeleted", isDeleted);

      if (selectedPost && selectedPost.postAttachments) {
        for (let i = 0; i < selectedPost.postAttachments.length; i++) {
          postData.append("prevAttachments", selectedPost.postAttachments[i]);
        }
      }
    }

    for (let i = 0; i < selectedFiles.length; i++) {
      postData.append("postAttachments", selectedFiles[i]);
    }

    try {
      const token = localStorage.getItem("token");
      let response;
      if (!editPost) {
        response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/post/createPost`,
          postData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              token: token,
            },
          }
        );
      } else {
        response = await axios.put(
          `${import.meta.env.VITE_SERVER_URL}/post/editPost`,
          postData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              token: token,
            },
          }
        );
      }
      if (response.status === 201) {
        const data = {
          email: response.data.email,
          postID: response.data.postId,
        };
        console.log("post created");
        setInputValue("");
        setSelectedFiles([]);
        setPostCategory("public");
        setAlertMessage("Post created successfully");
        setShowAlert(true);
        try {
          const res = await axios.put(
            `${import.meta.env.VITE_SERVER_URL}/post/addPostID`,
            data
          );
          if (res.status === 200) {
            console.log("user updated");
          }
        } catch (e) {
          console.log(e);
        }
        if (showYourPost) {
          setYourPostArray((prevPosts) => [response.data.post, ...prevPosts]);
        } else {
          setShowYourPost(true);
        }
      }
      if (response.status === 200) {
        console.log("post updated successfully");
        const updatedPost = response.data.updatedPost;

        setYourPostArray((prevPosts) => {
          return prevPosts.map((post) => {
            return post._id === updatedPost._id ? { ...updatedPost } : post;
          });
        });
        setEditPost(false);

        setAlertMessage("Post updated successfully");
        setShowAlert(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="createPost"
      onSubmit={handleCreatePost}
      encType="multipart/form-data"
    >
      <div className="createPostFirstRow">
        <div>
          <textarea
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="What's on your mind"
            className="postDescription"
            style={editPost ? { width: "34vw" } : { width: "24vw" }}
            ref={inputRef}
          />
        </div>
        <EmojiList setInputValue={setInputValue} inputRef={inputRef} />
        <div className="postAttachment">
          {selectedFiles.map((file, index) => (
            <PreviewItem
              key={index}
              file={file}
              onRemove={() => handleRemoveFile(index)}
            />
          ))}
        </div>
        <input
          type="file"
          name="postAttachments"
          multiple
          className="postAttachmentInput"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*, video/*"
        />
        {editPost &&
          selectedPost &&
          selectedPost.postAttachments &&
          !isDeleted &&
          selectedPost.postAttachments.length > 0 && (
            <button
              type="buton"
              style={{ cursor: "pointer" }}
              onClick={() => setIsDeleted(true)}
            >{`click to delete previous ${
              selectedPost.postAttachments.length
            } ${
              selectedPost.postAttachments.length === 1 ? "file" : "files"
            }`}</button>
          )}
        <button
          type="button"
          className="uploadPostAttachment"
          onClick={handleButtonClick}
        >
          Attach image/video
        </button>
        <div className="postCategoryContainer">
          <p className="postCategory">Post Category:</p>
          <select
            id="postCategory"
            name="postCategory"
            className="postCategoryOption"
            value={postCategory}
            onChange={(e) => setPostCategory(e.target.value)}
          >
            <option value="public" className="categotyOptionClass">
              Public
            </option>
            <option value="protected" className="categotyOptionClass">
              Protected
            </option>
            <option value="onlyMe" className="categotyOptionClass">
              Only me
            </option>
          </select>
        </div>
      </div>
      <div
        className="createPostSecondRow"
        style={editPost ? { display: "flex", alignItems: "center" } : {}}
      >
        <button
          type="submit"
          className={
            (isDisable && !editPost) || (editPost && isDisable && isDeleted)
              ? "createPostButton disabledCreatePost"
              : "createPostButton buttonHover"
          }
          disabled={
            (!editPost && isDisable) || (editPost && isDisable && isDeleted)
          }
        >
          {editPost ? "Apply Changes" : "Create Post"}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
