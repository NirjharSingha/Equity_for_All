import React, { useEffect } from "react";
import "./CreatePost.css";
import { useState, useRef } from "react";
import EmojiList from "./EmojiList";
import PreviewItem from "./PreviewItem";
import axios from "axios";

const CreatePost = () => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [postCategory, setPostCategory] = useState("public");

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

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

    for (let i = 0; i < selectedFiles.length; i++) {
      postData.append("postAttachments", selectedFiles[i]);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/post/createPost",
        postData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );
      if (response.status == 201) {
        console.log("post created successfully");
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
          />
        </div>
        <EmojiList setInputValue={setInputValue} />
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
      <button
        type="submit"
        className={
          isDisable
            ? "createPostButton disabledCreatePost"
            : "createPostButton buttonHover"
        }
        disabled={isDisable}
      >
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;
