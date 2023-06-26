import React from "react";
import { useState, useRef, useEffect } from "react";
import "./Register.css";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const Register = () => {
  useEffect(() => {
    console.log("register component loaded");
  }, []);

  const navigate = useNavigate();
  const handleRegSubmit = () => {
    navigate("/main");
  };

  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [password, setPassword] = useState("");
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{6,24}$/;
  const [showTooltip, setShowTooltip] = useState();
  const [isValidPassword, setIsValidPassword] = useState();

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handlePassword = (e) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
    setIsValidPassword(passwordRegex.test(inputValue));
    console.log(password != null);
    console.log(isValidPassword);
    setShowTooltip(!isValidPassword);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="registerPageContainer">
      <div className="registerPage">
        <div className="profileImage">
          <div className="displayImage">
            <input
              className="imageInput"
              type="file"
              id="profilePic"
              name="profilePic"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {selectedImage ? (
              <div className="imageContainer">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="selectedImage"
                />
              </div>
            ) : (
              <button className="imageButton" onClick={handleButtonClick}>
                Upload profile pic
              </button>
            )}
          </div>
        </div>
        <div className="userInfoContainer">
          <div className="userInfo">
            <label htmlFor="" className="registerLabel">
              Name:<span className="asterisk">*</span>
            </label>
            <label htmlFor="" className="registerLabel">
              Gmail:<span className="asterisk">*</span>
            </label>
            <div className="passLabelContainer">
              <label htmlFor="" className="registerLabel">
                Password:<span className="asterisk">*</span>
              </label>
              {password !== "" && isValidPassword && <TiTick />}
              {password !== "" && !isValidPassword && <RxCross2 />}
            </div>
            <label htmlFor="" className="registerLabel">
              Gender:<span className="asterisk">*</span>
            </label>
            <label htmlFor="" className="registerLabel">
              Country:<span className="asterisk">*</span>
            </label>
            <label htmlFor="" className="registerLabel">
              City:<span className="asterisk">*</span>
            </label>
            <label htmlFor="" className="registerLabel">
              Contact Number:
            </label>
            <textarea
              placeholder="Why are you on this website ?"
              className="registerTextArea_1"
            ></textarea>
            <textarea
              placeholder="What is your opinion on equity for all?"
              className="registerTextArea_2"
            ></textarea>
            <input
              type="text"
              name=""
              id=""
              className="registerInput regNameInput"
              required
            />
            <input
              type="email"
              name=""
              id=""
              className="registerInput regEmailInput"
              required
            />
            <div className="passContainer">
              <input
                type="password"
                name=""
                id=""
                className="regPassInput"
                value={password}
                required
                onChange={handlePassword}
                onMouseLeave={handleMouseLeave}
              />
              {showTooltip && (
                <div className="tooltip">
                  Password must contain 6-24 characters with at least one
                  capital letter, one small letter, one digit and no space
                </div>
              )}
            </div>
            <select className="registerInput regGenderInput" required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">LGBTQ+</option>
            </select>
            <select className="registerInput regCountryInput" required>
              <option value="">Select Country</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">LGBTQ+</option>
            </select>
            <select className="registerInput regCityInput" required>
              <option value="">Select City</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">LGBTQ+</option>
            </select>
            <input
              type="number"
              name=""
              id=""
              className="registerInput regNumInput"
            />
            <div className="submitContainer">
              <button
                type="submit"
                className="regSubmit"
                onClick={() => handleRegSubmit()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
