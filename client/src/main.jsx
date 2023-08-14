import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import UserInfoProvider from "./contexts/UserInfoContext.jsx";
import VerifyFile from "./contexts/VerifyFileContext.jsx";
import LikesContextProvider from "./contexts/LikesContext.jsx";
import DisplayUser from "./contexts/DisplayUserContext.jsx";
import PostContext from "./contexts/PostContext.jsx";
import OptionListContextProvider from "./contexts/OptionListContext.jsx";
import FriendContextProvider from "./contexts/FriendContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <UserInfoProvider>
      <VerifyFile>
        <DisplayUser>
          <LikesContextProvider>
            <PostContext>
              <OptionListContextProvider>
                <FriendContextProvider>
                  <App />
                </FriendContextProvider>
              </OptionListContextProvider>
            </PostContext>
          </LikesContextProvider>
        </DisplayUser>
      </VerifyFile>
    </UserInfoProvider>
  </Router>
);
