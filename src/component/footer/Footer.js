import React from "react";
import "./footer.css";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer_container">
      <ul className="footer_ul">
        <li>terms of use </li>
        <li>privacy policy</li>
        <li>blog</li>
        <li>about</li>
        <li>contact</li>
      </ul>

      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui debitis
        odio veritatis, accusantium pariatur blanditiis! Non voluptatem
        similique, veritatis ipsum et facere vero officiis ut, 
      </p>

      <div className="icon_set">
        <FaFacebook className="ist"/>
        <FaInstagram className="ist"/>
        <FaTwitter className="ist"/>
        <FaLinkedin className="ist"/>
      </div>
    </div>
  );
};

export default Footer;
