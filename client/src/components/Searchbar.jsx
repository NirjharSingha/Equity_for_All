import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./Searchbar.css";

const Searchbar = () => {
  return (
    <div className="searchbar">
      <input type="text" className="searchInput" />
      <SearchIcon />
    </div>
  );
};

export default Searchbar;
