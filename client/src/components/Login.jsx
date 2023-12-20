import React from "react";
import "./Login.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/register");
  };

  useEffect(() => {
    console.log("login component loaded");
    const token = localStorage.getItem("token");
    const verifyJWT = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/auth/verifyJWT?flag=initialAuth`,
          {
            headers: {
              token: token,
            },
          }
        );
        if (
          response.status === 200 &&
          response.data.message === "user verified"
        ) {
          navigate("/main");
        }
      } catch (error) {
        console.log(error);
        return;
      }
    };
    verifyJWT();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async () => {
    const postData = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}auth/login`,
        postData
      );
      if (response.status == 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/main");
      }
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status;
        const errorMessage = error.response.data.error;
        if (statusCode == 400) {
          if (errorMessage === "Invalid gmail") {
            setWarning("Invalid gmail. Register first");
          } else {
            setWarning("Invalid password. Try again");
          }
        }
      } else if (error.request) {
        console.error("Error:", error.request);
        setWarning("Invalid password. Try again");
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleGoogleAuth = async (details) => {
    const postData = {
      email: details.email,
      name: details.given_name,
      profilePic: details.picture,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/googleAuth`,
        postData
      );
      if (response.status == 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/main");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="loginPage">
          <div className="loginLeft">
            <div className="loginNameContainer">
              <a href="#" className="loginLogo">
                <img src="/nexusSphere.svg" alt="" width="60" height="62" />
              </a>
              <h1 className="loginHeading">Nexus Sphere</h1>
            </div>
          </div>
          <div className="loginRight">
            <div className="flexContainer">
              <div className="rightContainer">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="loginInput"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setWarning("");
                    setEmail(e.target.value);
                  }}
                />
                <div className="passwordConatiner loginInput">
                  <input
                    id="password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    className="loginPasswordInput"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                      setWarning("");
                      setPassword(e.target.value);
                    }}
                  />
                  {!showPass && (
                    <AiFillEye
                      className="passEye"
                      onClick={() => setShowPass((prev) => !prev)}
                    />
                  )}
                  {showPass && (
                    <AiFillEyeInvisible
                      className="passEye"
                      onClick={() => setShowPass((prev) => !prev)}
                    />
                  )}
                </div>
                <div className="labelClass">
                  <label htmlFor="" id="invalid">
                    {warning}
                  </label>
                </div>
                <button id="login" onClick={handleLogin}>
                  Log in
                </button>
                <div className="labelClass">
                  <label htmlFor="" id="qn">
                    Don't have an account?
                  </label>
                </div>
                <div className="btnContainer">
                  <button id="signup" onClick={handleSignUp}>
                    Create new account
                  </button>
                </div>
              </div>
            </div>
            <div className="marginDiv"></div>
            <GoogleOAuthProvider
              className="googlelogin"
              clientId={import.meta.env.VITE_CLIENT_ID}
            >
              <GoogleLogin
                className="googlelogin"
                onSuccess={(credentialResponse) => {
                  const details = jwtDecode(credentialResponse.credential);
                  handleGoogleAuth(details);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
