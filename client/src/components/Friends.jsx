import React, { useState } from "react";
import "./Friends.css";
import { useEffect } from "react";
import PersonCard from "./PersonCard";
import { useFriendContext } from "../contexts/FriendContext";
import axios from "axios";
import jwtDecode from "jwt-decode";

const Friends = () => {
  const {
    friendsID,
    setFriendsID,
    selectedOption,
    setSelectedOption,
    reqReceivedID,
    setReqReceivedID,
    blockID,
    setBlockID,
    reqSendID,
    setReqSendID,
    fetchSuggessions,
    setFetchSuggessions,
    suggessionsID,
    setSuggessionsID,
  } = useFriendContext();

  const [idToDisplay, setIdToDisplay] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    console.log("friend component loaded");
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`http://localhost:5000/user/getFriends`, {
      headers: {
        token: token,
      },
    });
    if (response) {
      setFriendsID(response.data.friends);
      setBlockID(response.data.blockList);
      setReqSendID(response.data.friendRequestSend);
      setReqReceivedID(response.data.friendRequestReceived);
      setPage(0);
    }
  };

  const fetchSuggessionData = async (dataToSend) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:5000/user/getFriendSuggessions?ids=${dataToSend}`,
      {
        headers: {
          token: token,
        },
      }
    );
    if (response) {
      let suggessions = response.data;
      const userEmail = jwtDecode(token).email;

      suggessions = suggessions.filter((element) => element != userEmail);
      suggessions = suggessions.filter((element) => !blockID.includes(element));
      suggessions = suggessions.filter(
        (element) => !reqSendID.includes(element)
      );
      suggessions = suggessions.filter(
        (element) => !reqReceivedID.includes(element)
      );
      suggessions = suggessions.filter(
        (element) => !friendsID.includes(element)
      );

      setSuggessionsID(suggessions);
    }
  };

  useEffect(() => {
    fetchData();
    setPage(0);
  }, []);

  useEffect(() => {
    if (selectedOption === 0) {
      setIdToDisplay(friendsID);
    } else if (selectedOption === 1) {
      setIdToDisplay(reqSendID);
    } else if (selectedOption === 2) {
      setIdToDisplay(reqReceivedID);
    } else if (selectedOption === 3) {
      setIdToDisplay(suggessionsID);
    } else if (selectedOption === 4) {
      setIdToDisplay(blockID);
    }
  }, [
    selectedOption,
    friendsID,
    blockID,
    reqSendID,
    reqReceivedID,
    suggessionsID,
  ]);

  useEffect(() => {
    const shuffleArray = (originalArray) => {
      let array = [...originalArray];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    if (selectedOption === 3 && fetchSuggessions) {
      setFetchSuggessions(false);
      const shuffledFriends = shuffleArray(friendsID);
      let arrayToSend = [];
      for (
        let index = 0;
        index < shuffledFriends.length && index < 10;
        index++
      ) {
        const element = shuffledFriends[index];
        arrayToSend.push(element);
      }
      fetchSuggessionData(arrayToSend);
    }
  }, [selectedOption, friendsID, blockID, reqSendID, reqReceivedID]);

  return (
    <div className="friendDiv">
      <div className="friendContainer">
        {idToDisplay.map((id) => (
          <div key={id} className="personFlex">
            <PersonCard email={id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
