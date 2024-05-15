import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import logoIcon from "../../../assests/logo-icon.svg";
import logoText from "../../../assests/logo-text.svg";

function Navbar() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo flex">
      <img className="md:w-16 w-10" alt="icon" src={logoIcon} />
        <img className="md:w-48 w-32" alt="text" src={logoText} />
      </div>
      <button
        className={`navbar-toggle ${isSideNavOpen ? "open" : ""}`}
        onClick={toggleSideNav}
      >
        <span className="navbar-toggle-icon"></span>
      </button>
      <ul className={`navbar-nav ${isSideNavOpen ? "open" : ""}`}>
        <li className="nav-item">
          <NavLink
            exact
            to="/"
            className="nav-link"
            activeClassName="active"
            onClick={toggleSideNav}
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/about"
            className="nav-link"
            activeClassName="active"
            onClick={toggleSideNav}
          >
            About
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/contact"
            className="nav-link"
            activeClassName="active"
            onClick={toggleSideNav}
          >
            Contact Us
          </NavLink>
        </li>
        <li className="nav-item">
  <NavLink
    to="/login"
    className="nav-link signup-btn"
    activeClassName="active"
    onClick={toggleSideNav}
    style={{ color: 'white', borderColor: '#4a6edb', borderWidth: '1px', borderStyle: 'solid' }} // Change font color and border color
  >
    Log In
  </NavLink>
</li>


      </ul>
    </nav>
  );
}

export default Navbar;
