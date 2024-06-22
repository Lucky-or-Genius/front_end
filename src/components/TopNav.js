import React, { useState, useEffect } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

import "../styles/topNav.css";
import logoIcon from "../assets/logo-icon.svg";
import logoText from "../assets/logo-text.svg";

const TopNav = () => {
  const { pathname } = useLocation();
  const [userData, setUserData] = useState();
  const handleRedirect = () => {
    // window.location.href = "http://localhost:3000";

    window.location.href = "https://www.luckyorgenius.com/";
  };
  useEffect(() => {
    let data = localStorage.getItem("userdata");
    setUserData(JSON.parse(data));
  }, []);
  return (
    <div className="topNav">
      <div className="topNav-header">
        <BiSolidCategory className="header-icon" />
        <div className="topNav-logo-div">
          <img className="logo-icon" alt="" src={logoIcon} />
          <img className="logo-text" alt="" src={logoText} />
        </div>
        <img
          onClick={async () => {
            await localStorage.clear();
            googleLogout();
            window.location.reload();
            console.log("clear");
            handleRedirect();
          }}
          className="notification-icon"
          alt=""
          src="/logouticon.svg"
        />
      </div>

      <div className="topNav-links">
        <NavLink
          to="/Feed"
          className={({ isActive }) =>
            isActive ? "active-link navlink" : "navlink"
          }
        >
          <p style={{ marginTop: "10px" }}> Feed</p>
        </NavLink>
        <NavLink
          to="/LeaderBoards"
          className={({ isActive }) =>
            isActive ? "active-link navlink" : "navlink"
          }
        >
          <p style={{ marginTop: "10px" }}> Leaderboards</p>
        </NavLink>
        <NavLink
          to="/Summaries"
          className={({ isActive }) =>
            isActive ? "active-link navlink" : "navlink"
          }
        >
          <p style={{ marginTop: "13px" }}>Summaries</p>
        </NavLink>
        <NavLink
          to="/Predictions"
          className={({ isActive }) =>
            isActive ? "active-link navlink" : "navlink"
          }
        >
          <p style={{ marginTop: "13px" }}>Predictions</p>
        </NavLink>
        <NavLink
          to="/Markets"
          className={({ isActive }) =>
            isActive ? "active-link navlink" : "navlink"
          }
        >
          <p style={{ marginTop: "13px" }}>Markets</p>
        </NavLink>
        <NavLink
          to="/MyChannels"
          className={({ isActive }) =>
            isActive ? "active-link navlink" : "navlink"
          }
        >
          <p style={{ marginTop: "13px" }}> My Channels</p>
        </NavLink>
        <NavLink
          to="/Favourites"
          className={({ isActive }) =>
            isActive ? "active-link navlink" : "navlink"
          }
        >
          <p style={{ marginTop: "13px" }}> Favourites</p>
        </NavLink>
      </div>
    </div>
  );
};

export default TopNav;
