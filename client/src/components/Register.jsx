import React from "react";
import { useState, useRef, useEffect } from "react";
import "./Register.css";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { Country, City } from "country-state-city";
import { useFileContext } from "../contexts/FileContext";
import axios from "axios";
import { useGlobals } from "../contexts/Globals";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Register = ({ isReg, profileData, handleMount, fetchProfileData }) => {
  const { setIsValidJWT } = useGlobals();
  const { deleteFile } = useFileContext();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(
    isReg ? "" : profileData.profilePic
  );
  const [profilePic, setProfilePic] = useState({});
  const [password, setPassword] = useState("");
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{6,24}$/;
  const [showTooltip, setShowTooltip] = useState(false);
  const [cityTooltip, setCityTooltip] = useState(
    !isReg
      ? profileData.country === ""
        ? "Select Country First"
        : profileData.city == ""
        ? "Select City"
        : profileData.city
      : "Select Country First"
  );
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [warning, setWarning] = useState("");
  const [countryName, setCountryName] = useState(
    isReg ? "" : profileData.country
  );
  const [selectedCity, setSelectedCity] = useState(
    isReg ? "" : profileData.city
  );
  const [user, setUser] = useState({
    name: isReg ? "" : profileData.name,
    email: isReg ? "" : profileData.email,
    gender: isReg ? "" : profileData.gender,
    country: isReg ? "" : profileData.countryCode,
    dob:
      isReg || profileData.dob === "" || profileData.dob == null
        ? ""
        : profileData.dob.substring(0, 10),
    school: isReg ? "" : profileData.school,
    college: isReg ? "" : profileData.college,
    university: isReg ? "" : profileData.university,
    workplace: isReg ? "" : profileData.workplace,
    contactNumber: isReg ? "" : profileData.contactNumber,
    relationshipStatus: isReg ? "" : profileData.relationshipStatus,
    profileStatus: isReg ? "Public" : profileData.profileStatus,
    reasonOfBeingHere: isReg ? "" : profileData.reasonOfBeingHere,
    aboutYourself: isReg ? "" : profileData.aboutYourself,
  });
  const [fileFlag, setFileFlag] = useState(false);

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleButtonClick = (e) => {
    fileInputRef.current.click();
  };

  const handlePassword = (e) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
    setIsValidPassword(passwordRegex.test(inputValue));
    setShowTooltip(!isValidPassword);
    setWarning("");
  };

  const handleCity = (e) => {
    setWarning("");
    if (user.country === "") {
      setCityTooltip("Select Country First");
      setSelectedCity("");
    } else {
      setSelectedCity(e.target.value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setProfilePic(file);
    setFileFlag(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedImage(reader.result);
      console.log(selectedImage);
    };
  };

  const handleInputChange = (e) => {
    setWarning("");
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log("register component loaded");

    const fetchCountries = () => {
      try {
        const countries = Country.getAllCountries();
        const countryData = countries.map((country) => ({
          name: country.name,
          code: country.isoCode,
        }));
        setCountries(countryData);
      } catch (error) {
        console.log("Error fetching countries:", error);
      }
    };

    fetchCountries();

    if (
      !isReg &&
      profileData.countryCode != null &&
      profileData.countryCode !== ""
    ) {
      const cityData = City.getCitiesOfCountry(profileData.countryCode);
      const allCities = cityData.map((city) => city.name);
      setCities(allCities);
    }
  }, []);

  const handleRegSubmit = async (e) => {
    e.preventDefault();
    if (user.name === "" || user.email === "") {
      setWarning("fill the * fields");
    } else if (isReg && password === "") {
      setWarning("you must give a password");
    } else if (isReg && !isValidPassword) {
      setWarning("invalid password");
    } else if (!isReg && password !== "" && !isValidPassword) {
      setWarning("invalid password");
    } else {
      const formData = new FormData(); // Create a new FormData object

      // Append the form data to the FormData object
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("password", password);
      formData.append("gender", user.gender);
      formData.append("country", countryName);
      formData.append("countryCode", user.country);
      formData.append("city", selectedCity);
      formData.append(
        "dob",
        user.dob === "" ? user.dob : new Date(user.dob).toISOString()
      );
      formData.append("school", user.school);
      formData.append("college", user.college);
      formData.append("university", user.university);
      formData.append("workplace", user.workplace);
      formData.append("contactNumber", user.contactNumber);
      formData.append("relationshipStatus", user.relationshipStatus);
      formData.append("profileStatus", user.profileStatus);
      formData.append("reasonOfBeingHere", user.reasonOfBeingHere);
      formData.append("aboutYourself", user.aboutYourself);
      formData.append("profilePic", profilePic);
      formData.append("createdAt", new Date(Date.now()).toISOString());
      formData.append("isReg", isReg);

      console.log(profilePic);

      if (isReg) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/auth/reg`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Set the Content-Type header to multipart/form-data
              },
            }
          );
          if (response.status == 201) {
            localStorage.setItem("token", response.data.token);
            navigate("/main");
          }
        } catch (error) {
          if (error.response) {
            const statusCode = error.response.status;
            const errorMessage = error.response.data.error;
            if (
              statusCode == 409 &&
              errorMessage === "Gmail address is already taken."
            ) {
              setWarning("Duplicate gmail address");
            }
          } else if (error.request) {
            console.error("Error:", error.request);
          } else {
            console.error("Error:", error.message);
          }
        }
      } else {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.put(
            `${import.meta.env.VITE_SERVER_URL}/profile/updateProfile`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                token: token,
              },
            }
          );
          console.log(response);
          if (
            response.status == 200 &&
            response.data.message === "User updated successfully"
          ) {
            // if (fileFlag && profileData.profilePic !== "") {
            //   deleteFile([profileData.profilePic]);
            // }
            handleMount();
            fetchProfileData(true);
          }
        } catch (error) {
          if (error.response.status === 401) {
            console.log("inside status code");
            setIsValidJWT(false);
          }
          if (error.response) {
            const statusCode = error.response.status;
            const errorMessage = error.response.data.error;
            if (
              statusCode == 409 &&
              errorMessage === "Gmail address is already taken."
            ) {
              setWarning("Duplicate gmail address");
            }
          } else if (error.request) {
            console.error("Error:", error.request);
          } else {
            console.error("Error:", error.message);
          }
        }
      }
    }
  };

  return (
    <div
      className={
        isReg ? "registerPageContainer" : "upadateProfilePageContainer"
      }
    >
      <div
        className={isReg ? "regIconContainer" : "upadateProfileIconContainer"}
      >
        <img
          src="/nexusSphere.svg"
          alt=""
          width="80"
          height="82"
          className="regLogo"
        />
      </div>
      <div
        className={
          isReg ? "regHeadingContainer" : "upadateProfileHeadingContainer"
        }
      >
        <h1 className="regHeading">Nexus Sphere</h1>
      </div>
      <form
        onSubmit={handleRegSubmit}
        className={isReg ? "registerPage" : "upadateProfilePage"}
        encType="multipart/form-data"
      >
        <div className="regImage">
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
            <div className="imageContainer">
              <img src={selectedImage} className="selectedImage" />
            </div>
          </div>
          <button
            type="button"
            className="imageButton"
            onClick={handleButtonClick}
          >
            {isReg ? "Upload profile pic" : "Update profile pic"}
          </button>
        </div>
        <div
          className={
            isReg ? "userInfoContainer" : "upadateProfileInfoContainer"
          }
        >
          <div className={isReg ? "userInfo" : "upadateProfileInfo"}>
            <div className="warning">{warning}</div>
            <label htmlFor="" className="registerLabel regNameLabel">
              Name:<span className="asterisk">*</span>
            </label>
            <label htmlFor="" className="registerLabel regGmailLabel">
              Email:<span className="asterisk">*</span>
            </label>
            <div className="passLabelContainer">
              <label htmlFor="" className="registerLabel">
                Password:<span className="asterisk">*</span>
              </label>
              {password !== "" && isValidPassword && (
                <TiTick className="regTick" />
              )}
              {password !== "" && !isValidPassword && (
                <RxCross2 className="regCross" />
              )}
            </div>
            <label htmlFor="" className="registerLabel regGenderLabel">
              Gender:
            </label>
            <label htmlFor="" className="registerLabel regCountryLabel">
              Country:
            </label>
            <label htmlFor="" className="registerLabel regCityLabel">
              City:
            </label>
            <label htmlFor="" className="registerLabel regDoBLabel">
              Date of Birth:
            </label>
            <label htmlFor="" className="registerLabel regSchoolLabel">
              School:
            </label>
            <label htmlFor="" className="registerLabel regCollegeLabel">
              College:
            </label>
            <label htmlFor="" className="registerLabel regVarsityLabel">
              University:
            </label>
            <label htmlFor="" className="registerLabel regWorkplaceLabel">
              Workplace:
            </label>
            <label htmlFor="" className="registerLabel regContactLabel">
              Contact Number:
            </label>
            <label htmlFor="" className="registerLabel regMaritalLabel">
              Relationship status:
            </label>
            <label htmlFor="" className="registerLabel regProfileStatusLabel">
              Profile status:
            </label>
            <label htmlFor="" className="registerLabel regTextAreaLabel_1">
              Why are you on this website ?
            </label>
            <label htmlFor="" className="registerLabel regTextAreaLabel_2">
              Say something about yourself:
            </label>
            <textarea
              id="reasonOfBeingHere"
              name="reasonOfBeingHere"
              placeholder="Why are you on this website ?"
              className="registerTextArea_1"
              value={user.reasonOfBeingHere}
              onChange={handleInputChange}
            ></textarea>
            <textarea
              id="aboutYourself"
              name="aboutYourself"
              placeholder="Say something about yourself"
              className="registerTextArea_2"
              value={user.aboutYourself}
              onChange={handleInputChange}
            ></textarea>
            <input
              type="text"
              name="name"
              id="name"
              className="registerInput regNameInput"
              required
              placeholder="Enter your name"
              value={user.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              id="email"
              className="registerInput regEmailInput"
              required
              placeholder="Enter your gmail"
              value={user.email}
              onChange={handleInputChange}
              disabled={!isReg}
            />
            <div className="passContainer">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                id="password"
                className="regPassInput"
                value={password}
                onChange={handlePassword}
                onMouseLeave={handleMouseLeave}
                placeholder={
                  isReg ? "Enter a strong password" : "Enter updated password"
                }
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
              {showTooltip && (
                <div className="tooltip">
                  Password must contain 6-24 characters with at least one
                  capital letter, one small letter, one digit and no space
                </div>
              )}
            </div>
            <select
              id="gender"
              name="gender"
              className="registerInput regGenderInput"
              value={user.gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">LGBTQ+</option>
            </select>
            <select
              id="country"
              name="country"
              className="registerInput regCountryInput"
              value={user.country}
              onChange={(e) => {
                const selectedOption = e.target.options[e.target.selectedIndex];
                const country = selectedOption.text;
                setUser({ ...user, [e.target.name]: e.target.value });
                setWarning("");
                setCountryName(country);
                console.log(countryName);
                console.log("country name");
                setSelectedCity("");
                if (e.target.value !== "") {
                  setCityTooltip("Select City");
                  const cityData = City.getCitiesOfCountry(e.target.value);
                  const allCities = cityData.map((city) => city.name);
                  setCities(allCities);
                } else {
                  setCityTooltip("Select Country First");
                  setCities([]);
                }
              }}
            >
              <option value="">Select Country</option>
              {countries.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            <select
              id="city"
              name="city"
              className="registerInput regCityInput"
              value={selectedCity}
              onChange={handleCity}
            >
              <option value="" style={{ fontSize: "inherit" }}>
                {cityTooltip}
              </option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <select
              id="relationshipStatus"
              name="relationshipStatus"
              className="registerInput regMaritalInput"
              value={user.relationshipStatus}
              onChange={handleInputChange}
            >
              <option value="">Select Relationship status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="ralation">In a relation</option>
            </select>
            <input
              type="number"
              name="contactNumber"
              id="contactNumber"
              className="registerInput regNumInput"
              placeholder="Enter your contact number"
              value={user.contactNumber}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="dob"
              id="dob"
              className="registerInput regDoBInput"
              value={user.dob}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="school"
              id="school"
              className="registerInput regSchoolInput"
              placeholder="Enter your school name"
              value={user.school}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="college"
              id="college"
              className="registerInput regCollegeInput"
              placeholder="Enter your college name"
              value={user.college}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="university"
              id="university"
              className="registerInput regVarsityInput"
              placeholder="Enter your varsity name"
              value={user.university}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="workplace"
              id="workplace"
              className="registerInput regWorkplaceInput"
              placeholder="Enter your workplace"
              value={user.workplace}
              onChange={handleInputChange}
            />
            <select
              id="profileStatus"
              name="profileStatus"
              className="registerInput regProfileStatusInput"
              value={user.profileStatus}
              onChange={handleInputChange}
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Locked">Locked</option>
            </select>
            <div className="submitContainer">
              <button type="submit" className="regSubmit">
                {isReg ? "Submit" : "Apply"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
