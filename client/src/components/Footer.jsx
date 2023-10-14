import React from "react";
import "./Footer.css";
import { useEffect } from "react";

import {
  BsFacebook,
  BsInstagram,
  BsGithub,
  BsTwitter,
  BsLinkedin,
} from "react-icons/bs";

const Footer = () => {
  useEffect(() => {
    console.log("footer component loaded");
  }, []);

  return (
    <div className="footerDiv">
      <div className="iconContainer">
        <img src="/nexusSphere.svg" alt="" className="footerIcon" />
        <div className="footerText">
          <p>&copy; {new Date().getFullYear()} All rights reserved </p>
          <p>Terms and privacy policy</p>
        </div>
      </div>
      <div className="footerRight">
        <div className="footerRightDiv">
          <h1 className="heading">Nexus Sphere</h1>
          <div className="footerLinkIcons">
            <div className="footerIconContainer">
              <a href="#">
                <BsFacebook className="footerLinkIcon" />
              </a>
            </div>
            <div className="footerIconContainer">
              <a href="#">
                <BsInstagram className="footerLinkIcon" />
              </a>
            </div>
            <div className="footerIconContainer">
              <a href="#">
                <BsGithub className="footerLinkIcon" />
              </a>
            </div>
            <div className="footerIconContainer">
              <a href="#">
                <BsTwitter className="footerLinkIcon" />
              </a>
            </div>
            <div className="footerIconContainer">
              <a href="#">
                <BsLinkedin className="footerLinkIcon" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footerCenter">
        <div className="resources">
          <h1 className="heading2">Resources</h1>
          <div className="footerScrollContainer">
            <p className="footerScrollContent">
              <br />
              <br />
              <a href="#">About us</a>
              <a href="#">Help</a>
              <a href="#">Company</a>
              <a href="#">Company</a>
            </p>
          </div>
        </div>
        <div className="company">
          <h1 className="heading2">Company</h1>
          <div className="footerScrollContainer">
            <p className="footerScrollContent">
              <br />
              <br />
              <a href="#">Lorem ipsum</a>
              <a href="#">Lorem ipsum</a>
              <a href="#">Lorem ipsum</a>
              <a href="#">Lorem ipsum</a>
            </p>
          </div>
        </div>
        <div className="support">
          <h1 className="heading2">Suppport</h1>
          <div className="footerScrollContainer">
            <p className="footerScrollContent">
              <br />
              <br />
              <a href="#">Company 1</a>
              <a href="#">Company 2</a>
              <a href="#">Company 3</a>
              <a href="#">Company 4</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
