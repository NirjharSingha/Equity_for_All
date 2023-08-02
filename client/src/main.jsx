import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import UserInfoProvider from "./contexts/UserInfoContext.jsx";
import VerifyFile from "./contexts/VerifyFileContext.jsx";
import LikesContextProvider from "./contexts/LikesContext.jsx";
import DisplayUser from "./contexts/DisplayUserContext.jsx";
import EditPostContext from "./contexts/EditPostContext.jsx";
import DisplayPost from "./contexts/DisplayPostContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <UserInfoProvider>
      <VerifyFile>
        <DisplayUser>
          <LikesContextProvider>
            <EditPostContext>
              <DisplayPost>
                <App />
              </DisplayPost>
            </EditPostContext>
          </LikesContextProvider>
        </DisplayUser>
      </VerifyFile>
    </UserInfoProvider>
  </Router>
);
