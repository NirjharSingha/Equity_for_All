import React from "react";
import "./CreatePost.css";
import { useState, useRef } from "react";
import EmojiList from "./EmojiList";
import PreviewItem from "./PreviewItem";

const CreatePost = () => {
  const [previewResult, setPreviewResult] = useState("");
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

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

  return (
    <div className="createPost">
      <EmojiList
        previewResult={previewResult}
        setPreviewResult={setPreviewResult}
      />
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
      <button
        onClick={() => console.log(previewResult)}
        className="createPostButton"
      >
        Create Post
      </button>
    </div>
  );
};

export default CreatePost;
