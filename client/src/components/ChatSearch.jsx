import React, { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./ChatSearch.css";
import { useEffect } from "react";
import axios from "axios";
import ItemCard from "./ItemCard";
import { useGlobals } from "../contexts/Globals";
import { FaArrowLeft } from "react-icons/fa6";
import SearchResult from "./SearchResult";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";

const ChatSearch = () => {
  const { windowWidth } = useGlobals();
  useEffect(() => {
    console.log("chat search loaded");
  }, []);

  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showSearchList, setShowList] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const searchRef = useRef(null);
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

  const handleSearchClick = (searchItem) => {};

  return (
    <div
      className="searchbar"
      style={{ position: "relative", marginLeft: "0.9rem" }}
      ref={searchRef}
    >
      <div className="chatSearchInputContainer">
        <div className="chatSearchIconConainer">
          {inputValue.length === 0 && (
            <IoSearchOutline style={{ color: "grey", fontSize: "1.1rem" }} />
          )}
          {inputValue.length > 0 && (
            <FaArrowLeft
              style={{ color: "grey", fontSize: "1.1rem", cursor: "pointer" }}
              onClick={() => {
                setInputValue("");
                setShowList(false);
              }}
            />
          )}
        </div>
        <input
          type="text"
          className="chatSearchInput"
          placeholder="Search in chat"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>
      {showSearchList && (
        <div className="chatSearchList">
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

export default ChatSearch;
