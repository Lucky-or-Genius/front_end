import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import logoIcon from "../../../assets/logo.png";
import { HiOutlineFingerPrint } from "react-icons/hi";

function Navbar() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <nav className="navbar pt-4 md:pb-4 font-raleway sticky top-0 bg-[#00000020] backdrop-blur-sm z-[99999]">
      <div className="md:w-2/3 w-full flex justify-between items-center">
        <div className="flex pr-4 ">
          <img className="w-56 h-full" alt="text" src={logoIcon} />
        </div>

        <div className="flex gap-8 font-[600]">
          <ul
            className={`navbar-nav ${
              isSideNavOpen ? "open" : ""
            } gap-4 !3xl:text-xl`}
          >
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
          </ul>

          <button
            className={`navbar-toggle ${isSideNavOpen ? "open" : ""}`}
            onClick={toggleSideNav}
          >
            <span className="navbar-toggle-icon"></span>
          </button>
          <NavLink
            to="/login"
            className="nav-link hidden px-4 rounded-2xl 3xl:text-xl py-0.5 md:flex items-center gap-2 group border border-[#4a6edb] !text-white font-[600] hover:shadow-sm transition-all ease-in-out duration-400 hover:shadow-[#4a6edb]"
            activeClassName="active"
            onClick={toggleSideNav}
          >
            <HiOutlineFingerPrint className="group-hover:text-white text-gray-600 transition-all ease-in-out duration-600" />
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
