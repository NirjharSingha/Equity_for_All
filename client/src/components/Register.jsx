import React from "react";
import { useState, useRef, useEffect } from "react";
import "./Register.css";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { Country, City } from "country-state-city";
import axios from "axios";

const Register = ({ isReg, profileData, handleMount, fetchProfileData }) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

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
    console.log(file);
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
    } else if (!isValidPassword) {
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
            "http://localhost:5000/user/reg",
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
            "http://localhost:5000/user/updateProfile",
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
            localStorage.setItem("token", response.data.token);
            handleMount();
            fetchProfileData(true);
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
        <svg
          id="logo-88"
          width="80"
          height="82"
          viewBox="0 0 40 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="regLogo"
        >
          <path
            className="ccustom"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.7146 0.516113C11.4582 0.516113 9.2943 1.41245 7.69881 3.00794L0 10.7067V14.2307C0 16.7204 1.06944 18.9603 2.77401 20.5161C1.06944 22.0719 0 24.3118 0 26.8015V30.3255L7.69881 38.0243C9.2943 39.6198 11.4582 40.5161 13.7146 40.5161C16.2043 40.5161 18.4442 39.4467 20 37.7421C21.5558 39.4467 23.7957 40.5161 26.2854 40.5161C28.5418 40.5161 30.7057 39.6198 32.3012 38.0243L40 30.3255V26.8015C40 24.3118 38.9306 22.0719 37.226 20.5161C38.9306 18.9603 40 16.7204 40 14.2307V10.7067L32.3012 3.00794C30.7057 1.41245 28.5418 0.516113 26.2854 0.516113C23.7957 0.516113 21.5558 1.58555 20 3.29012C18.4442 1.58555 16.2043 0.516113 13.7146 0.516113ZM25.7588 20.5161C25.6629 20.4286 25.5688 20.3387 25.4766 20.2465L20 14.7699L14.5234 20.2465C14.4312 20.3387 14.3371 20.4286 14.2412 20.5161C14.3371 20.6036 14.4312 20.6935 14.5234 20.7857L20 26.2623L25.4766 20.7857C25.5688 20.6935 25.6629 20.6036 25.7588 20.5161ZM22.2222 30.3255L22.2222 32.0085C22.2222 34.2525 24.0414 36.0717 26.2854 36.0717C27.363 36.0717 28.3965 35.6436 29.1585 34.8816L35.5556 28.4845V26.8015C35.5556 24.5575 33.7364 22.7383 31.4924 22.7383C30.4148 22.7383 29.3813 23.1664 28.6193 23.9284L22.2222 30.3255ZM17.7778 30.3255L11.3807 23.9284C10.6187 23.1664 9.58524 22.7383 8.50762 22.7383C6.26359 22.7383 4.44444 24.5575 4.44444 26.8015V28.4845L10.8415 34.8816C11.6035 35.6436 12.637 36.0717 13.7146 36.0717C15.9586 36.0717 17.7778 34.2525 17.7778 32.0085V30.3255ZM17.7778 9.02373V10.7067L11.3807 17.1038C10.6187 17.8658 9.58524 18.2939 8.50762 18.2939C6.26359 18.2939 4.44444 16.4747 4.44444 14.2307V12.5477L10.8415 6.15063C11.6035 5.38864 12.637 4.96056 13.7146 4.96056C15.9586 4.96056 17.7778 6.7797 17.7778 9.02373ZM28.6193 17.1038L22.2222 10.7067L22.2222 9.02373C22.2222 6.7797 24.0414 4.96056 26.2854 4.96056C27.363 4.96056 28.3965 5.38864 29.1585 6.15063L35.5556 12.5477V14.2307C35.5556 16.4747 33.7364 18.2939 31.4924 18.2939C30.4148 18.2939 29.3813 17.8658 28.6193 17.1038Z"
            fill="#FF630B"
          ></path>
        </svg>
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
            />
            <div className="passContainer">
              <input
                type="password"
                name="password"
                id="password"
                className="regPassInput"
                value={password}
                required
                onChange={handlePassword}
                onMouseLeave={handleMouseLeave}
                placeholder="Enter a strong password"
              />
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
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="locked">Locked</option>
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
