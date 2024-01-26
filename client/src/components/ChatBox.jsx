import React, { useState, useEffect } from "react";
import "./ChatBox.css";
import { useGlobals } from "../contexts/Globals";
import { BsEmojiSmile } from "react-icons/bs";
import { IoAttachOutline } from "react-icons/io5";
import { BiSolidSend } from "react-icons/bi";
import ChatCard from "./ChatCard";
import ItemCard from "./ItemCard";
import EmojiList from "./EmojiList";
import { useRef } from "react";
import axios from "axios";
import { useChat } from "../contexts/ChatContext";
import { TbReload } from "react-icons/tb";
import io from "socket.io-client";
import jwtDecode from "jwt-decode";
import Typing from "../animations/Typing.json";
import Lottie from "lottie-react";

let socket;
const ENDPOINT = import.meta.env.VITE_SERVER_URL;

const ChatBox = ({ setShowChat, chatUser }) => {
  const [isRotating, setIsRotating] = useState(false);
  const { setIsValidJWT, windowWidth } = useGlobals();
  const [showEmojis, setShowEmojis] = useState(false);
  const fileInputRef = useRef(null);
  const {
    selectedFiles,
    setSelectedFiles,
    inputValue,
    setInputValue,
    chats,
    setChats,
    chatToEdit,
    setChatToEdit,
    prevFiles,
    setPrevFiles,
    newFiles,
    setNewFiles,
    setChatUsers,
    setUnreadChat,
  } = useChat();
  const inputRef = useRef(null);
  const emojiRef = useRef(null);
  const Ref = useRef(null);
  const chatRef = useRef(null);
  const [showLoading, setShowLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messageExchanged, setMessageExchanged] = useState(false);
  const numOfChatsPerPage = 15;
  const [chatCount, setChatCount] = useState({
    page: 1,
    count:
      chatUser.unreadCount <= numOfChatsPerPage
        ? numOfChatsPerPage
        : chatUser.unreadCount,
  });
  const [chatIds, setChatIds] = useState([]);
  const chatScrollRef = useRef(null);

  const currentUser = jwtDecode(localStorage.getItem("token")).email;
  const users = [chatUser.id, currentUser];
  users.sort();
  const room = users[0] + "_" + users[1];

  const seenById = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/chat/seenById/${id}`,
        {},
        {
          headers: {
            token: token,
          },
        }
      );
      if (response) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        setIsValidJWT(false);
        console.log(401);
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("connect", () => {
      setSocketConnected(true);
    });
    socket.emit("join_chat", room);
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop_typing", () => setIsTyping(false));
    socket.on("seen", () => {
      console.log("inside seen socket");
      setChats((prevChats) => {
        const newChats = prevChats.map((cht) => {
          if (cht.sender === currentUser) {
            return { ...cht, isSeen: true };
          } else {
            return cht;
          }
        });
        return newChats;
      });
    });

    socket.on("receive_message", (newMessageRecieved) => {
      console.log("inside receive_message socket");
      socket.emit("seen", room);
      seenById(newMessageRecieved.chat._id);

      const { chat, flag } = newMessageRecieved;
      const currentUser = jwtDecode(localStorage.getItem("token")).email;
      if (chat.sender === chatUser.id && chat.receiver === currentUser) {
        if (flag === "create") {
          setChats((prevChats) => [chat, ...prevChats]);

          if (chatScrollRef && chatScrollRef.current) {
            chatScrollRef.current.scrollTop = 0;
          }

          if (!messageExchanged) {
            setMessageExchanged(true);
          }
        } else if (flag === "update") {
          setChats((prevChats) => {
            const newChats = prevChats.map((cht) => {
              if (cht._id === chat._id) {
                console.log(chat);
                return chat;
              } else {
                return cht;
              }
            });
            return newChats;
          });
        } else if (flag === "delete") {
          console.log("delete socket");
          setChats((prevChats) => {
            return prevChats.filter((cht) => cht._id !== chat._id);
          });
        }
      } else if (chat.receiver === chatUser.id && chat.sender === currentUser) {
        if (flag === "updateLike") {
          setChats((prevChats) => {
            const newChats = prevChats.map((cht) => {
              if (cht._id === chat._id) {
                console.log(chat);
                return chat;
              } else {
                return cht;
              }
            });
            return newChats;
          });
        }
      }
    });

    return () => {
      socket.off("connect");
      socket.off("receive_message");
      socket.disconnect();
      setChats([]);
      setChatIds([]);
    };
  }, []);

  useEffect(() => {
    if (messageExchanged) {
      console.log("inside message exchanged");
      setChatUsers((prevChatUsers) => {
        const desiredId = chatUser.id;
        const desiredIndex = prevChatUsers.findIndex(
          (item) => item.id === desiredId
        );

        if (desiredIndex !== -1) {
          const movedObject = prevChatUsers.splice(desiredIndex, 1)[0];
          prevChatUsers.unshift(movedObject);
        }

        return prevChatUsers;
      });
    }
  }, [messageExchanged]);

  const handleDelete = async (_id, setShowChatSideBar) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/chat/deleteChat/${_id}`,
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.status == 200) {
        console.log("chat deleted successfully");
        setShowChatSideBar(false);
        setChats((prevChats) => prevChats.filter((chat) => chat._id !== _id));

        const socketData = {
          chat: response.data.chat,
          flag: "delete",
          room: room,
        };

        socket.emit("send_message", socketData);
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.log("inside status code");
        setIsValidJWT(false);
      }
    }
  };

  const updateLike = async (_id, selectedLike, setShouldDisplayAllLikes) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/chat/updateLike/${_id}`,
        { selectedLike },
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.status == 200) {
        console.log("like updated successfully");
        console.log(response.data);
        setShouldDisplayAllLikes(false);

        const socketData = {
          chat: response.data,
          flag: "updateLike",
          room: room,
        };
        socket.emit("send_message", socketData);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        setIsValidJWT(false);
        console.log(401);
      }
    }
  };

  const handleRotateClick = () => {
    setIsRotating(true);
    setChatToEdit("");
    setInputValue("");
    setSelectedFiles([]);
    setPrevFiles([]);
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);

    if (chatToEdit !== "") {
      setNewFiles((prevFiles) => [...prevFiles, ...filesArray]);
    }
  };

  const handleSubmitChat = async (e) => {
    e.preventDefault();

    if (inputValue === "" && selectedFiles.length === 0) {
      return;
    }
    const chatData = new FormData();

    chatData.append("chatDescription", inputValue);

    if (chatToEdit === "") {
      chatData.append("time", new Date(Date.now()));
      chatData.append("receiver", chatUser.id);

      for (let i = 0; i < selectedFiles.length; i++) {
        chatData.append("chatAttachments", selectedFiles[i]);
      }
    } else {
      for (let i = 0; i < prevFiles.length; i++) {
        chatData.append("prevFiles", prevFiles[i]);
      }
      for (let i = 0; i < newFiles.length; i++) {
        chatData.append("chatAttachments", newFiles[i]);
      }
      chatData.append("id", chatToEdit);
    }

    try {
      const token = localStorage.getItem("token");
      let response;

      if (chatToEdit === "") {
        response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/chat/createChat`,
          chatData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              token: token,
            },
          }
        );
      } else {
        response = await axios.put(
          `${import.meta.env.VITE_SERVER_URL}/chat/editChat`,
          chatData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              token: token,
            },
          }
        );
      }

      if (response) {
        console.log(response.data);
        setSelectedFiles([]);
        setInputValue("");
        socket.emit("stop_typing", room);

        if (chatToEdit === "") {
          setChats((prevChats) => [response.data.chat, ...prevChats]);

          if (chatScrollRef && chatScrollRef.current) {
            chatScrollRef.current.scrollTop = 0;
          }

          if (!messageExchanged) {
            setMessageExchanged(true);
          }
          const socketData = {
            chat: response.data.chat,
            flag: "create",
            room: room,
          };
          socket.emit("send_message", socketData);
          const globalSocketData = {
            chat: response.data.chat,
            room: chatUser.id,
          };
          socket.emit("global_send_message", globalSocketData);
        } else {
          setChatToEdit("");
          const newChats = chats.map((chat) => {
            if (chat._id === chatToEdit) {
              return response.data;
            } else {
              return chat;
            }
          });
          setChats(newChats);
          const socketData = {
            chat: response.data,
            flag: "update",
            room: room,
          };
          socket.emit("send_message", socketData);
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmitChat(event);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        if (Ref.current && !Ref.current.contains(event.target)) {
          setShowEmojis(false);
        }
      }
    };

    const fetchChatIds = async () => {
      try {
        setShowLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/chat/getChatIds/${chatUser.id}`,
          {
            headers: {
              token: token,
            },
          }
        );
        if (response) {
          setChatIds(response.data);
          setShowLoading(false);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
        if (error.response.status === 401) {
          setIsValidJWT(false);
        }
      }
    };

    fetchChatIds();

    const makeSeen = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
          `${import.meta.env.VITE_SERVER_URL}/chat/makeSeen/${chatUser.id}`,
          {},
          {
            headers: {
              token: token,
            },
          }
        );
        if (response) {
          setChatUsers((prevChatUsers) => {
            const newChatUsers = prevChatUsers.map((chtUsr) => {
              if (chtUsr.id === chatUser.id) {
                return { ...chtUsr, unreadCount: 0 };
              } else {
                return chtUsr;
              }
            });
            return newChatUsers;
          });

          socket.emit("seen", room);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          setIsValidJWT(false);
          console.log(401);
        }
      }
    };

    if (chatUser.unreadCount > 0) {
      makeSeen();
    }

    setUnreadChat((prev) => {
      return prev.filter((item) => item.sender !== chatUser.id);
    });

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      if (chatIds.length > 0) {
        let arrayToSend = [];
        let idx = 0;
        if (chatCount.page !== 1) {
          idx = chatCount.count - numOfChatsPerPage;
        }
        for (
          let index = idx;
          index < chatCount.count && index < chatIds.length;
          index++
        ) {
          console.log(index);
          const element = chatIds[index];
          arrayToSend.push(element);
        }
        if (arrayToSend.length > 0) {
          try {
            setShowLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get(
              `${
                import.meta.env.VITE_SERVER_URL
              }/chat/getChats?ids=${arrayToSend}`,
              {
                headers: {
                  token: token,
                },
              }
            );
            if (response) {
              const data = response.data;
              setChats((prevChats) => [...prevChats, ...data]);
              setShowLoading(false);
            }
          } catch (error) {
            console.error("Error fetching chats:", error);
            if (error.response.status === 401) {
              setIsValidJWT(false);
            }
          }
        } else {
          console.log("no more chats");
        }
      }
    };

    fetchChats();
  }, [chatIds, chatCount.page]);

  const handleScroll = () => {
    const currentScrollTop = Math.abs(chatScrollRef.current.scrollTop);
    const currentScrollHeight = chatScrollRef.current.scrollHeight;
    const currentClientHeight = chatScrollRef.current.clientHeight;

    if (currentScrollHeight - (currentScrollTop + currentClientHeight) < 1) {
      console.log("updating page");
      setChatCount((prev) => {
        return {
          ...prev,
          page: prev.page + 1,
          count: prev.count + numOfChatsPerPage,
        };
      });
    }
  };

  useEffect(() => {
    const currentDivRef = chatScrollRef.current;

    if (currentDivRef) {
      const scrollHandler = () => handleScroll();
      currentDivRef.addEventListener("scroll", scrollHandler);

      return () => {
        currentDivRef.removeEventListener("scroll", scrollHandler);
      };
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setShowChat(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="chatBox" ref={chatRef}>
      <div
        className="commentCrossContainer"
        style={{
          borderTopRightRadius: `${windowWidth > 440 ? 0 : "10px"}`,
          backgroundColor: "rgb(162, 158, 158)",
          height: "2.1rem",
          backgroundColor: "rgb(197, 190, 190)",
        }}
      >
        <TbReload
          className={`commentReload rotating-element ${
            isRotating ? "rotate-once" : ""
          }`}
          onClick={handleRotateClick}
        />
        <button className="commentCross" onClick={() => setShowChat(false)}>
          X
        </button>
      </div>
      <ItemCard
        containerClass="chatInboxHeading"
        imgClass="optionListImg"
        nameClass="optionListName"
        shouldDisplayImg={chatUser.profilePic !== ""}
        imgSrc={chatUser.profilePic}
        icon="/profilePicIcon.svg"
        name={chatUser.name}
      />
      <div className="chatInboxContainer" ref={chatScrollRef}>
        {isTyping ? (
          <Lottie
            animationData={Typing}
            loop={true}
            autoplay={true}
            style={{
              width: "2.8rem",
              height: "1.2rem",
              marginLeft: "0.2rem",
              marginTop: "0.2rem",
            }}
          />
        ) : (
          <></>
        )}
        {chats &&
          chats.map((chat) => (
            <ChatCard
              key={chat._id}
              chat={chat}
              handleDelete={handleDelete}
              updateLike={updateLike}
            />
          ))}
      </div>
      <form className="chatInputLine" encType="multipart/form-data">
        <div style={{ display: "flex", width: "100%" }}>
          {showEmojis && (
            <div
              className="commentMainEmoji"
              style={{ bottom: "1.9rem" }}
              ref={emojiRef}
            >
              <EmojiList setInputValue={setInputValue} inputRef={inputRef} />
            </div>
          )}
          <div
            className="chatSearchIconConainer"
            style={{ width: "2.4rem" }}
            onClick={() => setShowEmojis((prev) => !prev)}
            ref={Ref}
          >
            <BsEmojiSmile
              className="commentEmojiIcon"
              style={{ fontSize: "1.2rem", color: "grey" }}
            />
          </div>
          <input
            type="text"
            className="chatSearchInput"
            placeholder="Search in chat"
            style={{
              borderRadius: "0",
              borderRight: "none",
              minWidth: "calc(90% - 5.2rem)",
            }}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (!socketConnected) return;

              if (!isTyping) {
                socket.emit("typing", room);
              }

              let lastTypingTime = new Date().getTime();
              let timerLength = 5000;
              setTimeout(() => {
                let timeNow = new Date().getTime();
                let timeDiff = timeNow - lastTypingTime;
                if (timeDiff >= timerLength) {
                  socket.emit("stop_typing", room);
                }
              }, timerLength);
            }}
            ref={inputRef}
            onKeyDown={handleKeyPress}
          />
          <div
            className="chatSearchIconConainer"
            style={{
              width: "2.4rem",
              borderTop: "2px solid grey",
              borderRight: "2px solid grey",
              borderBottom: "2px solid grey",
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
              borderTopRightRadius: "4rem",
              borderBottomRightRadius: "4rem",
              borderLeft: "none",
            }}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              name="chatAttachments"
              multiple
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*, video/*"
            />
            <IoAttachOutline
              className="commentEmojiIcon"
              style={{ fontSize: "1.2rem", color: "grey" }}
            />
          </div>
        </div>
        <BiSolidSend
          style={{
            fontSize: "1.4rem",
            marginTop: "0.5rem",
            marginLeft: "0.3rem",
            cursor: `${
              inputValue === "" && selectedFiles.length === 0
                ? "not-allowed"
                : "pointer"
            }`,
            color: "rgb(114, 113, 113)",
          }}
          onClick={handleSubmitChat}
        />
      </form>
      {selectedFiles.length > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: "5px",
            textAlign: "center",
            width: "100%",
            fontSize: "0.85rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>
            {selectedFiles.length +
              ` ${selectedFiles.length > 1 ? "files" : "file"} selected`}
          </p>
          <div
            className="chatFileUploadCross"
            style={{ maxWidth: "0.5rem", maxHeight: "0.5rem", width: "0.5rem" }}
          >
            <p
              style={{ fontSize: "0.8rem" }}
              onClick={() => {
                setSelectedFiles([]);
                setPrevFiles([]);
                setNewFiles([]);
              }}
            >
              x
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
