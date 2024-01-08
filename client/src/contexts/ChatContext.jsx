import React, { createContext, useContext, useState } from "react";
import { useRef } from "react";

const ChatContext = createContext();

export function useChat() {
  return useContext(ChatContext);
}

const ChatProvider = ({ children }) => {
  const [selectedInbox, setSelectedInbox] = useState(null);
  return (
    <ChatContext.Provider value={{ selectedInbox, setSelectedInbox }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
