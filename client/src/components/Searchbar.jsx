import React, { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./Searchbar.css";
import { useEffect } from "react";
import axios from "axios";
import ItemCard from "./ItemCard";
import { useGlobals } from "../contexts/Globals";
import { FaArrowLeft } from "react-icons/fa6";
import SearchResult from "./SearchResult";

const Searchbar = () => {
  const { windowWidth } = useGlobals();
  useEffect(() => {
    console.log("search bar loaded");
  }, []);

  const [fetchedData, setFetchedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showSearchList, setShowList] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const searchRef = useRef(null);
  const [showResult, setShowResult] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

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
        setFilteredData([]);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSearchClick = (searchItem) => {
    setSelectedItem(searchItem);
    setShowList(false);
    setInputValue("");
    setFilteredData([]);
    setShowResult(true);
  };

  return (
    <div className="searchbar" ref={searchRef}>
      {showResult && (
        <SearchResult
          selectedItem={selectedItem}
          setShowResult={setShowResult}
        />
      )}
      <input
        type="text"
        className="searchInput"
        placeholder="Search here"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      {windowWidth <= 500 && (
        <SearchIcon
          style={{ color: "#4d4f52", cursor: "pointer" }}
          onClick={() => {
            setShowList(true);
          }}
        />
      )}
      {showSearchList && (
        <div className="searchList">
          {windowWidth <= 500 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "0.5rem",
              }}
            >
              <FaArrowLeft
                className="searchListIcon"
                onClick={() => {
                  setShowList(false);
                  setInputValue("");
                  setFilteredData([]);
                }}
              />
              <input
                type="text"
                className="searchListInput"
                placeholder="Search here"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
              />
            </div>
          )}
          {filteredData.map((searchItem) => (
            <div
              key={searchItem._id}
              onClick={() => handleSearchClick(searchItem)}
            >
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
