import React from "react";
import { FaDiscord, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-left">
          <h2>PlanD</h2>
        </div>
        <div className="footer-center">
          <div className="social-icons">
            <FaDiscord className="icon" />
            <FaInstagram className="icon" />
            <FaFacebook className="icon" />
            <FaTwitter className="icon" />
          </div>
          <p>© 2024 All rights reserved</p>
        </div>
        <div className="footer-right">
          <ul>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;