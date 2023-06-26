import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./Searchbar.css";
import { useEffect } from "react";

const Searchbar = () => {
  useEffect(() => {
    console.log("search bar loaded");
  }, []);

  return (
    <div className="searchbar">
      <input type="text" className="searchInput" />
      <SearchIcon />
    </div>
  );
};

export default Searchbar;
