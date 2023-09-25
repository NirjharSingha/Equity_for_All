import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import UserInfoProvider from "./contexts/UserInfoContext.jsx";
import VerifyFile from "./contexts/VerifyFileContext.jsx";
import LikesContextProvider from "./contexts/LikesContext.jsx";
import DisplayUser from "./contexts/DisplayUserContext.jsx";
import PostContext from "./contexts/PostContext.jsx";
import LikesListContextProvider from "./contexts/LikesListContext.jsx";
import FriendContextProvider from "./contexts/FriendContext.jsx";
import StoryContextProvider from "./contexts/StoryContext.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Auth0Provider
      domain="dev-xjdn44xqcb3pgmhc.us.auth0.com"
      clientId="5ZGKvK4sC3pEM4qjRdZOHbrcMFW71AfN"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <UserInfoProvider>
        <VerifyFile>
          <DisplayUser>
            <LikesContextProvider>
              <PostContext>
                <LikesListContextProvider>
                  <FriendContextProvider>
                    <StoryContextProvider>
                      <App />
                    </StoryContextProvider>
                  </FriendContextProvider>
                </LikesListContextProvider>
              </PostContext>
            </LikesContextProvider>
          </DisplayUser>
        </VerifyFile>
      </UserInfoProvider>
    </Auth0Provider>
  </Router>
);
