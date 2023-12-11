import React, { useState } from "react";
import "./nav.css";
import { IoMdSearch } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

import { SiThemoviedatabase } from "react-icons/si";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

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
          <li>
            <Link className="linka" to="/tv-shows">
              TV Shows
            </Link>
          </li>
          <li>
            <IoMdSearch className="duca" />
          </li>

          <div className="hamburger" onClick={() => setMenu(!menu)}>
            <RxHamburgerMenu />
          </div>

        </div>

        <div className="mobile_back">
          <div
            className="mobile_menu gfs"
            style={{ right: menu ? "0px" : "-50000vw" }}
          >
            <ul className="nav_mobile_ul">
              <li className="nav_mobile_li" onClick={() => setMenu(!menu)}>
                <Link className="linka" to="/movie">
                  movies
                </Link>
              </li>
                <div className="liner1"></div>
              <li className="nav_mobile_li" onClick={() => setMenu(!menu)}>
                <Link className="linka" to="/tv-shows">
                  TV Shows
                </Link>
              </li>
              <div className="liner1"></div>

            </ul>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Navbar;
