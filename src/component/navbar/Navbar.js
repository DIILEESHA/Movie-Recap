import React from "react";
import "./nav.css";
import { IoMdSearch } from "react-icons/io";

import { SiThemoviedatabase } from "react-icons/si";

const Navbar = () => {
  return (
    <div className="nav_container">
      <div className="nav_left">
        <div className="logo">
          <SiThemoviedatabase className="logger" style={{
        color: 'linear-gradient(to right, #f5af19, #f12711)', // Your gradient color
      }}/>
        </div>
      </div>
      <div className="nav_right">
        <div className="nav_ul">
          <li>movies</li>
          <li>TV Shows</li>
          <li>
            <IoMdSearch className="duca"/>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
