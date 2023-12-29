import React from "react";
import PersonCard from "./PersonCard";

const SearchResult = ({ selectedItem, setShowResult }) => {
  console.log(selectedItem);
  return (
    <div className="fullScreenBlur">
      <div className="editPostCross" onClick={() => setShowResult(false)}>
        X
      </div>
      <div className="searchResult">
        <PersonCard email={selectedItem.email} />
      </div>
    </div>
  );
};

export default SearchResult;
