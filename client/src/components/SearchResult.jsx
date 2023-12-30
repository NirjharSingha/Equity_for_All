import React, { useState } from "react";
import PersonCard from "./PersonCard";
import AlertMessage from "./AlertMessage";

const SearchResult = ({ selectedItem, setShowResult }) => {
  const [searchMessage, setSearchMessage] = useState(false);
  return (
    <div className="fullScreenBlur">
      {searchMessage && (
        <div style={{ maxWidth: "50vw" }}>
          <AlertMessage
            alertMessage={"Sorry, the user blocked you."}
            setState={setSearchMessage}
          />
        </div>
      )}
      <div className="editPostCross" onClick={() => setShowResult(false)}>
        X
      </div>
      <div className="searchResult">
        <PersonCard
          email={selectedItem.email}
          searchFlag={true}
          setSearchMessage={setSearchMessage}
          setShowSearchResult={setShowResult}
        />
      </div>
    </div>
  );
};

export default SearchResult;
