import React, { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./Searchbar.css";
import { useEffect } from "react";
import axios from "axios";
import ItemCard from "./ItemCard";

const Searchbar = () => {
  useEffect(() => {
    console.log("search bar loaded");
  }, []);

  const [fetchedData, setFetchedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showSearchList, setShowList] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const searchRef = useRef(null);

  const handleInputChange = async (value) => {
    setInputValue(value);
    if (value.length > 0) {
      setShowList(true);
    } else {
      setShowList(false);
    }
    if (value.length === 1) {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/searchResult?value=${value}`
      );
      if (response) {
        setFetchedData(response.data);
        setFilteredData(response.data);
      }
    } else if (value.length === 0) {
      setFilteredData([]);
    } else {
      setFilteredData(() => {
        const data = fetchedData.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
        console.log(data);
        return data;
      });
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowList(false);
        setInputValue("");
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="searchbar" ref={searchRef}>
      {/* <SearchResult /> */}
      <input
        type="text"
        className="searchInput"
        placeholder="Search here"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      <SearchIcon style={{ color: "#4d4f52", cursor: "pointer" }} />
      {showSearchList && (
        <div className="searchList">
          {filteredData.map((searchItem) => (
            <ItemCard
              key={searchItem._id}
              containerClass="searchLine"
              imgClass="optionListImg"
              nameClass="optionListName"
              shouldDisplayImg={!(searchItem.pic === "")}
              imgSrc={searchItem.pic}
              icon={
                searchItem.flag === "user"
                  ? "/profilePicIcon.svg"
                  : "/group.png"
              }
              name={searchItem.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
