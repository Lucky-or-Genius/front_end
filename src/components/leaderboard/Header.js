import React, { useState, useEffect } from "react";
import "./header.css";
import { useLocation } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

function Header({ searchLeaderboard }) {
  const { pathname } = useLocation();
  const [userData, setUserData] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const handleRedirect = () => {
    window.location.href = "http://localhost:3000";
    // window.location.href = "https://www.luckyorgenius.com";
  };

  useEffect(() => {
    let data = localStorage.getItem("userdata");
    setUserData(JSON.parse(data));
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchLeaderboard(searchTerm);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="lead-header">
      <b className="lead-page-name">{pathname.slice(1).toLocaleUpperCase()}</b>
      <div className="search-bar">
        <input
          className=""
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress} // Listen for key press events
        />
        <img className="search-icon" alt="" src="/vector.svg" />
      </div>
      <div className="lead-profile-info">
        <h4 className="user-name">{userData?.given_name}</h4>
        <img className="user-photo" alt="user-photo" src={userData?.picture} />
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
    </div>
  );
}

export default Header;
