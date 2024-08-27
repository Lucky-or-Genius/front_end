import React, { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { Drawer, Menu, Space } from "antd";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { FiKey, FiLayout, FiSend, FiLogOut } from "react-icons/fi";
import { GoStack } from "react-icons/go";
import { BsHddStack } from "react-icons/bs";
import { googleLogout } from "@react-oauth/google";
import { TbHeartCheck } from "react-icons/tb";
import logo from "../../../assets/logo.png";

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState();

  const generalItems = [
    {
      key: "/dashboard/Feed",
      label: "Feed",
      icon: <GoStack />,
    },
    {
      key: "/dashboard/LeaderBoards",
      label: "Leaderboards",
      icon: <FiLayout />,
    },
    {
      key: "/dashboard/Summaries",
      label: "Summaries",
      icon: <FiKey />,
    },
    {
      key: "/dashboard/Predictions",
      label: "Predictions",
      icon: <FiSend />,
    },
    {
      key: "/dashboard/MyChannels",
      label: "MyChannels",
      icon: <BsHddStack />,
    },
    {
      key: "/dashboard/Favourites",
      label: "Favourites",
      icon: <TbHeartCheck />,
    },
  ];

  const handleRedirect = () => {
    // window.location.href = "http://localhost:3000";

    window.location.href = "https://www.luckyorgenius.com/";
  };

  useEffect(() => {
    let data = localStorage.getItem("userdata");
    setUserData(JSON.parse(data));
  }, []);

  return (
    <>
      <div className="bg-darkPrimary w-full  flex md:hidden items-center p-4 justify-between">
        <button onClick={() => setOpen(true)}>
          <HiOutlineMenuAlt1 className="w-10 !h-full text-white flex md:hidden bg-primary h-10 p-2 rounded-full" />
        </button>
        <img src={logo} alt="logo" className="w-1/2" />
      </div>
      <Drawer
        placement={"left"}
        width={300}
        onClose={() => setOpen(false)}
        open={open}
        extra={<Space></Space>}
      >
        <Menu
          defaultSelectedKeys={[pathname]}
          mode="inline"
          onClick={(item) => {
            navigate(item.key);
            setOpen(false);
          }}
          className="font-raleway text-xs !border-none"
        >
          <span className="flex font-poppins pl-5 pt-4 font-bold text-gray600">
            General
          </span>

          {/* General items */}
          {generalItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon} disabled={item.disabled}>
              {item.label}
            </Menu.Item>
          ))}

          <Menu.Item
            key="/"
            icon={<FiLogOut />}
            onClick={async () => {
              await localStorage.clear();
              googleLogout();
              handleRedirect();
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
        <div className="flex font-raleway text-xs px-7 w-full gap-2 items-center absolute bottom-12  py-4 text-white rounded-lg">
          <img
            src={userData?.picture}
            width={10}
            height={10}
            className={`rounded-full w-8 `}
          />
          <h4>{userData?.given_name}</h4>
        </div>
      </Drawer>
    </>
  );
};

export default App;
