import React from "react";
import "./Chat.css";
import { useEffect, useState } from "react";
import ChatSearch from "./ChatSearch";
import ItemCard from "./ItemCard";
import ChatBox from "./ChatBox";
import axios from "axios";
import { useGlobals } from "../contexts/Globals";
import jwtDecode from "jwt-decode";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { useChat } from "../contexts/ChatContext";
import Loading from "./Loading";

const Chat = () => {
  const { getUserInfo } = useUserInfoContext();
  const { chatUsers, setChatUsers } = useChat();
  const [blockList, setBlockList] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const { setIsValidJWT } = useGlobals();
  const [chatUser, setChatUser] = useState({});
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    console.log("chat component loaded");

    const fetchSuggessionData = async (dataToSend) => {
      console.log("fetching suggessions");
      try {
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
          let suggessionsData = response.data;
          const userEmail = jwtDecode(token).email;

          suggessionsData = suggessionsData.filter(
            (element) => element != userEmail
          );
          setShowLoading(false);
          return suggessionsData;
        }
      } catch (error) {
        if (error.response.status === 401) {
          console.log("inside status code");
          setIsValidJWT(false);
        }
      }
    };

    const fetchChatUsers = async () => {
      try {
        setShowLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/chat/getChatUsers`,
          {
            headers: {
              token: token,
            },
          }
        );
        if (response) {
          const { mergedChatList, blockList } = response.data;
          setChatUsers(mergedChatList);
          setBlockList(blockList);
          setShowLoading(false);

          if (mergedChatList.length > 0) {
            return;
          } else {
            const friendList = [];
            let chatSuggessions = await fetchSuggessionData(friendList);
            chatSuggessions = chatSuggessions.filter(
              (id) => !blockList.includes(id)
            );

            let promises = [];

            chatSuggessions.forEach((id) => {
              promises.push(
                (async () => {
                  const { name, profilePic } = await getUserInfo(id);
                  return {
                    id: id,
                    name: name,
                    profilePic: profilePic,
                    unreadCount: 0,
                  };
                })()
              );
            });

            Promise.all(promises)
              .then((finalData) => {
                setChatUsers(finalData);
              })
              .catch((error) => {
                console.error("Error fetching user info:", error);
              });
          }
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          console.log("inside status code");
          setIsValidJWT(false);
        }
      }
    };

    fetchChatUsers();
  }, []);

  const [selectedOption, setSelectedOption] = useState("inbox");

  return (
    <div className="chatContainer">
      {showChat && <ChatBox setShowChat={setShowChat} chatUser={chatUser} />}
      <p className="chatHeading">Chats</p>
      <ChatSearch />
      <div className="grpOptionBtn">
        <button
          className={
            selectedOption === "inbox" ? "selectedGrpOption" : "grpPageBtn"
          }
          onClick={() => setSelectedOption("inbox")}
        >
          Inbox
        </button>
        <button
          className={
            selectedOption === "groups" ? "selectedGrpOption" : "grpPageBtn"
          }
          onClick={() => setSelectedOption("groups")}
        >
          Groups
        </button>
      </div>
      <div className="chatCardContainer">
        {showLoading && (
          <div className="loadingContainer">
            <Loading />
          </div>
        )}
        {chatUsers.map((user) => (
          <div
            key={user.id}
            className="chatCard"
            onClick={() => {
              setChatUser(user);
              setShowChat(true);
            }}
          >
            <ItemCard
              key={user.id}
              containerClass="chatCardVerticalLine"
              imgClass="optionListImg"
              nameClass="optionListName"
              shouldDisplayImg={user.profilePic !== ""}
              imgSrc={user.profilePic}
              icon="/profilePicIcon.svg"
              name={user.name}
            />
            {user.unreadCount > 0 && (
              <div
                style={{
                  height: "100%",
                  aspectRatio: "1/1",
                  minWidth: "1.2rem",
                  borderRadius: "50%",
                  backgroundColor: "grey",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                  padding: "3px",
                  color: "white",
                }}
              >
                {user.unreadCount}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
