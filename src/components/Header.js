import React, { useState, useEffect } from "react";
import "../styles/header.css";
import { useLocation, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

function Header() {
  const { pathname } = useLocation();
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const handleRedirect = () => {
    // window.location.href = "http://localhost:3000";

    window.location.href = "https://www.luckyorgenius.com/";
  };
  useEffect(() => {
    let data = localStorage.getItem("userdata");
    setUserData(JSON.parse(data));
  }, []);

  return (
    <div className="header">
      <b className="page-name">{pathname.slice(1).toLocaleUpperCase()}</b>
      <div className="profile-info">
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
