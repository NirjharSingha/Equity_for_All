import React, { useRef, useState } from "react";
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

  const [flags, setFlags] = useState({
    friendFlag: false,
    reqSendFlag: false,
    reqReceivedFlag: false,
    blockFlag: false,
  });

  const [idToDisplay, setIdToDisplay] = useState([]);
  const [page, setPage] = useState(0);
  const divRef = useRef(null);
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const [cardPerPage] = useState(9);

  useEffect(() => {
    console.log("friend component loaded");
    setSelectedOption(0);
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
    }
  };

  const fetchSuggessionData = async (dataToSend) => {
    console.log("fetching suggessions");
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
    setFlags((prevFlags) => ({
      ...prevFlags,
      friendFlag: true,
    }));
  }, [friendsID]);

  useEffect(() => {
    setFlags((prevFlags) => ({
      ...prevFlags,
      reqSendFlag: true,
    }));
  }, [reqSendID]);

  useEffect(() => {
    setFlags((prevFlags) => ({
      ...prevFlags,
      reqReceivedFlag: true,
    }));
  }, [reqReceivedID]);

  useEffect(() => {
    setFlags((prevFlags) => ({
      ...prevFlags,
      blockFlag: true,
    }));
  }, [blockID]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // if (selectedOption === 0) {
    //   setIdToDisplay(friendsID);
    // } else if (selectedOption === 1) {
    //   setIdToDisplay(reqSendID);
    // } else if (selectedOption === 2) {
    //   setIdToDisplay(reqReceivedID);
    // } else if (selectedOption === 3) {
    //   setIdToDisplay(suggessionsID);
    // } else if (selectedOption === 4) {
    //   setIdToDisplay(blockID);
    // }
    setPage(0);
    let idsToAdd = [];
    let selecArray;
    if (selectedOption === 0) {
      selecArray = friendsID;
    } else if (selectedOption === 1) {
      selecArray = reqSendID;
    } else if (selectedOption === 2) {
      selecArray = reqReceivedID;
    } else if (selectedOption === 3) {
      selecArray = suggessionsID;
    } else if (selectedOption === 4) {
      selecArray = blockID;
    }
    for (
      let index = 0;
      index < selecArray.length && index < cardPerPage;
      index++
    ) {
      const element = selecArray[index];
      idsToAdd.push(element);
    }
    setIdToDisplay([...idsToAdd]);
  }, [
    selectedOption,
    friendsID,
    blockID,
    reqSendID,
    reqReceivedID,
    suggessionsID,
  ]);

  // useEffect(() => {
  //   setIdToDisplay([]);
  // }, [selectedOption]);

  useEffect(() => {
    if (page !== 0) {
      let idsToAdd = [];
      let selecArray;
      if (selectedOption === 0) {
        selecArray = friendsID;
      } else if (selectedOption === 1) {
        selecArray = reqSendID;
      } else if (selectedOption === 2) {
        selecArray = reqReceivedID;
      } else if (selectedOption === 3) {
        selecArray = suggessionsID;
      } else if (selectedOption === 4) {
        selecArray = blockID;
      }
      for (
        let index = page * cardPerPage;
        index < selecArray.length && index < page * cardPerPage + cardPerPage;
        index++
      ) {
        const element = selecArray[index];
        idsToAdd.push(element);
      }
      setIdToDisplay((prev) => [...prev, ...idsToAdd]);
    }
  }, [page]);

  useEffect(() => {
    const shuffleArray = (originalArray) => {
      let array = [...originalArray];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    if (
      flags.friendFlag &&
      flags.reqSendFlag &&
      flags.reqReceivedFlag &&
      flags.blockFlag
    ) {
      console.log("trying to fetch suggession");
      if (fetchSuggessions) {
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
    }
  }, [friendsID, blockID, reqSendID, reqReceivedID]);

  useEffect(() => {
    const currentDivRef = divRef.current;

    if (currentDivRef) {
      const scrollHandler = () =>
        handleScroll(divRef, prevScrollTop, setPrevScrollTop);
      currentDivRef.addEventListener("scroll", scrollHandler);

      return () => {
        currentDivRef.removeEventListener("scroll", scrollHandler);
      };
    }
  }, []);

  const handleScroll = (divRef, prevScrollTop, setPrevScrollTop) => {
    const currentScrollTop = divRef.current.scrollTop;
    if (currentScrollTop > prevScrollTop) {
      if (
        divRef.current.scrollHeight -
          divRef.current.scrollTop -
          divRef.current.clientHeight <
        1
      ) {
        setPage((prev) => prev + 1);
      }
    }
    setPrevScrollTop(currentScrollTop);
  };

  return (
    <div className="friendDiv">
      <div className="friendContainer" ref={divRef}>
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
