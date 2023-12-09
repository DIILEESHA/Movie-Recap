import React from "react";
import "./nav.css";
import { IoMdSearch } from "react-icons/io";

import { SiThemoviedatabase } from "react-icons/si";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav_container">
      <div className="nav_left">
        <div className="logo">
          <Link to="/">
            <SiThemoviedatabase
              className="logger"
              style={{
                color: "linear-gradient(to right, #f5af19, #f12711)", // Your gradient color
              }}
            />
          </Link>
        </div>
      </div>
      <div className="nav_right">
        <div className="nav_ul">
          <li>
            <Link className="linka" to="/movie">
              movies
            </Link>
          </li>
          <li>TV Shows</li>
          <li>
            <IoMdSearch className="duca" />
          </li>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
