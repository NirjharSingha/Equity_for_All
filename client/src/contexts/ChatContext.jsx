import React, { createContext, useContext, useState } from "react";
import { useRef } from "react";

const ChatContext = createContext();

export function useChat() {
  return useContext(ChatContext);
}

const ChatProvider = ({ children }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [chats, setChats] = useState([]);
  const [chatToEdit, setChatToEdit] = useState("");
  const [prevFiles, setPrevFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [chatUsers, setChatUsers] = useState([]);
  const [chatUser, setChatUser] = useState({});
  const [showChat, setShowChat] = useState(false);

  return (
    <ChatContext.Provider
      value={{
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
        chatUsers,
        setChatUsers,
        chatUser,
        setChatUser,
        showChat,
        setShowChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
