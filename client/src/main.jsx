import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import UserInfoProvider from "./contexts/UserInfoContext.jsx";
import VerifyFile from "./contexts/VerifyFileContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <UserInfoProvider>
      <VerifyFile>
        <App />
      </VerifyFile>
    </UserInfoProvider>
  </Router>
);
