import React, { useRef, useState } from "react";
import "./Friends.css";
import { useEffect } from "react";
import PersonCard from "./PersonCard";
import { useFriendContext } from "../contexts/FriendContext";
import axios from "axios";
import jwtDecode from "jwt-decode";
import BirthDays from "./BirthDays";
import AlertMessage from "./AlertMessage";
import Loading from "./Loading";

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
    followersID,
    setFollowersID,
    followingsID,
    setFollowingsID,
    showAlert,
    setShowAlert,
    alertMessage,
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
  const [cardPerPage] = useState(7);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    console.log("friend component loaded");
    setSelectedOption(0);
  }, []);

  const fetchData = async () => {
    setShowLoading(true);
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/friend/getFriends`,
      {
        headers: {
          token: token,
        },
      }
    );
    if (response) {
      setFriendsID(response.data.friends);
      setBlockID(response.data.blockList);
      setReqSendID(response.data.friendRequestSend);
      setReqReceivedID(response.data.friendRequestReceived);
      setFollowersID(response.data.followers);
      setFollowingsID(response.data.followings);
      setShowLoading(false);
    }
  };

  const fetchSuggessionData = async (dataToSend) => {
    console.log("fetching suggessions");
    setShowLoading(true);
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/friend/getFriendSuggessions?ids=${dataToSend}`,
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
      setShowLoading(false);
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
    if (selectedOption !== 7) {
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
        selecArray = followersID;
      } else if (selectedOption === 5) {
        selecArray = followingsID;
      } else if (selectedOption === 6) {
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
    } else {
      setIdToDisplay([]);
    }
  }, [
    selectedOption,
    friendsID,
    blockID,
    reqSendID,
    reqReceivedID,
    suggessionsID,
    followersID,
    followingsID,
  ]);

  useEffect(() => {
    if (page !== 0 && selectedOption !== 7) {
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
        selecArray = followersID;
      } else if (selectedOption === 5) {
        selecArray = followingsID;
      } else if (selectedOption === 6) {
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
      {showAlert && (
        <AlertMessage alertMessage={alertMessage} setState={setShowAlert} />
      )}
      {selectedOption === 7 && <BirthDays />}
      {selectedOption !== 7 && (
        <div className="friendContainer" ref={divRef}>
          {idToDisplay.map((id) => (
            <div key={id} className="personFlex">
              <PersonCard email={id} />
            </div>
          ))}
          {showLoading && (
            <div className="friendLoading">
              <Loading />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Friends;
