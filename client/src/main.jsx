import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import UserInfoProvider from "./contexts/UserInfoContext.jsx";
import FileContextProvider from "./contexts/FileContext.jsx";
import LikesContextProvider from "./contexts/LikesContext.jsx";
import PostContext from "./contexts/PostContext.jsx";
import LikesListContextProvider from "./contexts/LikesListContext.jsx";
import FriendContextProvider from "./contexts/FriendContext.jsx";
import StoryContextProvider from "./contexts/StoryContext.jsx";
import GlobalsProvider from "./contexts/Globals.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import GroupContextProvider from "./contexts/GroupContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH_DOMAIN}
      clientId={import.meta.env.VITE_AUTH_CLIENT}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <GlobalsProvider>
        <UserInfoProvider>
          <FileContextProvider>
            <LikesContextProvider>
              <PostContext>
                <LikesListContextProvider>
                  <FriendContextProvider>
                    <StoryContextProvider>
                      <GroupContextProvider>
                        <App />
                      </GroupContextProvider>
                    </StoryContextProvider>
                  </FriendContextProvider>
                </LikesListContextProvider>
              </PostContext>
            </LikesContextProvider>
          </FileContextProvider>
        </UserInfoProvider>
      </GlobalsProvider>
    </Auth0Provider>
  </Router>
);
