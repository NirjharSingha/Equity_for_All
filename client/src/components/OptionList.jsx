import React from "react";
import "./OptionList.css";
import { useState, useEffect, useRef } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaLaughSquint, FaSadCry, FaAngry } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

const OptionList = () => {
  const [horizontalItems, setHorizontalItems] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const listRef = useRef(null);

  useEffect(() => {
    console.log("optionList component loaded");
    setHorizontalItems([
      AiFillLike,
      AiFillDislike,
      FaLaughSquint,
      FaAngry,
      FaSadCry,
      FcLike,
    ]);

    const handleOutsideClick = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const getClassBasedOnIndex = (index) => {
    if (index === 0 || index === 1) {
      return "blue";
    } else if (index === 2) {
      return "yellow";
    } else if (index === 3) {
      return "red";
    } else if (index === 4) {
      return "lightBlue";
    }
  };

  return (
    <div className="optionListContainer" ref={listRef}>
      <div className="horizontalBar">
        <div
          className={`horizontalItemContainer ${
            selectedItemIndex === 0 ? "selectedItem" : ""
          }`}
          onClick={() => setSelectedItemIndex(0)}
        >
          <p className={`horizontalIcon`} style={{ fontSize: "1.3rem" }}>
            All
          </p>
          <p>5</p>
        </div>
        {horizontalItems.map((IconComponent, index) => (
          <div
            key={index}
            className={`horizontalItemContainer ${
              selectedItemIndex === index + 1 ? "selectedItem" : ""
            }`}
            onClick={() => setSelectedItemIndex(index + 1)}
          >
            <IconComponent
              className={`horizontalIcon ${getClassBasedOnIndex(index)}`}
            />
            <p>5</p>
          </div>
        ))}
      </div>
      <div className="verticalContainer">
        <div className="verticalContainerLine">
          <img
            src="http://localhost:5000/uploads/1690496368840-Screenshot from 2023-07-09 23-28-25.png"
            alt=""
            className="optionListImg"
          />
          <p className="optionListName">
            Demo name Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam iusto laudantium autem.
          </p>
        </div>
        <div className="verticalContainerLine">
          <img
            src="http://localhost:5000/uploads/1690496368840-Screenshot from 2023-07-09 23-28-25.png"
            alt=""
            className="optionListImg"
          />
          <p className="optionListName">
            Demo name Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam iusto laudantium autem.
          </p>
        </div>
        <div className="verticalContainerLine">
          <img
            src="http://localhost:5000/uploads/1690496368840-Screenshot from 2023-07-09 23-28-25.png"
            alt=""
            className="optionListImg"
          />
          <p className="optionListName">
            Demo name Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam iusto laudantium autem.
          </p>
        </div>
        <div className="verticalContainerLine">
          <img
            src="http://localhost:5000/uploads/1690496368840-Screenshot from 2023-07-09 23-28-25.png"
            alt=""
            className="optionListImg"
          />
          <p className="optionListName">
            Demo name Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam iusto laudantium autem.
          </p>
        </div>
        <div className="verticalContainerLine">
          <img
            src="http://localhost:5000/uploads/1690496368840-Screenshot from 2023-07-09 23-28-25.png"
            alt=""
            className="optionListImg"
          />
          <p className="optionListName">
            Demo name Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam iusto laudantium autem.
          </p>
        </div>
        <div className="verticalContainerLine">
          <img
            src="http://localhost:5000/uploads/1690496368840-Screenshot from 2023-07-09 23-28-25.png"
            alt=""
            className="optionListImg"
          />
          <p className="optionListName">
            Demo name Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam iusto laudantium autem.
          </p>
        </div>
        <div className="verticalContainerLine">
          <img
            src="http://localhost:5000/uploads/1690496368840-Screenshot from 2023-07-09 23-28-25.png"
            alt=""
            className="optionListImg"
          />
          <p className="optionListName">
            Demo name Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam iusto laudantium autem.
          </p>
        </div>
        <div className="verticalContainerLine">
          <img
            src="http://localhost:5000/uploads/1690496368840-Screenshot from 2023-07-09 23-28-25.png"
            alt=""
            className="optionListImg"
          />
          <p className="optionListName">
            Demo name Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam iusto laudantium autem.
          </p>
        </div>
        <div className="verticalContainerLine">
          <img
            src="http://localhost:5000/uploads/1690496368840-Screenshot from 2023-07-09 23-28-25.png"
            alt=""
            className="optionListImg"
          />
          <p className="optionListName">
            Demo name Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam iusto laudantium autem.
          </p>
        </div>
        <div className="verticalContainerLine">
          <img
            src="http://localhost:5000/uploads/1690496368840-Screenshot from 2023-07-09 23-28-25.png"
            alt=""
            className="optionListImg"
          />
          <p className="optionListName">
            Demo name Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam iusto laudantium autem.
          </p>
        </div>
        <div className="verticalContainerLine">
          <img
            src="http://localhost:5000/uploads/1690496368840-Screenshot from 2023-07-09 23-28-25.png"
            alt=""
            className="optionListImg"
          />
          <p className="optionListName">
            Demo name Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam iusto laudantium autem.
          </p>
        </div>
        <div className="verticalContainerLine">
          <img
            src="http://localhost:5000/uploads/1690496368840-Screenshot from 2023-07-09 23-28-25.png"
            alt=""
            className="optionListImg"
          />
          <p className="optionListName">
            Demo name Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam iusto laudantium autem.
          </p>
        </div>
        <div className="verticalContainerLine">
          <img
            src="http://localhost:5000/uploads/1690496368840-Screenshot from 2023-07-09 23-28-25.png"
            alt=""
            className="optionListImg"
          />
          <p className="optionListName">
            Demo name Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam iusto laudantium autem.
          </p>
        </div>
        <div className="verticalContainerLine">
          <img
            src="http://localhost:5000/uploads/1690496368840-Screenshot from 2023-07-09 23-28-25.png"
            alt=""
            className="optionListImg"
          />
          <p className="optionListName">
            Demo name Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam iusto laudantium autem.
          </p>
        </div>
        <div className="verticalContainerLine">
          <img
            src="http://localhost:5000/uploads/1690496368840-Screenshot from 2023-07-09 23-28-25.png"
            alt=""
            className="optionListImg"
          />
          <p className="optionListName">
            Demo name Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam iusto laudantium autem.
          </p>
        </div>
        <div className="verticalContainerLine">
          <img
            src="http://localhost:5000/uploads/1690496368840-Screenshot from 2023-07-09 23-28-25.png"
            alt=""
            className="optionListImg"
          />
          <p className="optionListName">
            Demo name Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam iusto laudantium autem.
          </p>
        </div>
        <div className="verticalContainerLine">
          <img
            src="http://localhost:5000/uploads/1690496368840-Screenshot from 2023-07-09 23-28-25.png"
            alt=""
            className="optionListImg"
          />
          <p className="optionListName">
            Demo name Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam iusto laudantium autem.
          </p>
        </div>
        <div className="verticalContainerLine">
          <img
            src="http://localhost:5000/uploads/1690496368840-Screenshot from 2023-07-09 23-28-25.png"
            alt=""
            className="optionListImg"
          />
          <p className="optionListName">
            Demo name Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam iusto laudantium autem.
          </p>
        </div>
      </div>
    </div>
  );
};
export default OptionList;
