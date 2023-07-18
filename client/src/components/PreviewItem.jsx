import React from "react";
import "./PreviewItem.css";
import { useState } from "react";

const PreviewItem = ({ file, onRemove }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const handlePreview = () => {
    if (showPreview) {
      setShowPreview(false);
      setPreviewUrl("");
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
        setShowPreview(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="preview-item">
      <div className="file-info">
        <span>{file.name}</span>
        <button type="button" onClick={handlePreview}>
          Preview
        </button>
        <button type="button" onClick={onRemove}>
          ×
        </button>{" "}
        {/* Remove button */}
      </div>
      {showPreview && (
        <div className="file-preview">
          {file.type.startsWith("image/") ? (
            <img src={previewUrl} alt={file.name} />
          ) : file.type.startsWith("video/") ? (
            <video src={previewUrl} controls />
          ) : (
            <span>Unsupported File Type</span>
          )}
        </div>
      )}
    </div>
  );
};

export default PreviewItem;
