import { AiOutlineLoading3Quarters } from "react-icons/ai";
import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <AiOutlineLoading3Quarters className="loadingIcon" />
      <p>loading...</p>
    </div>
  );
};

export default Loading;
