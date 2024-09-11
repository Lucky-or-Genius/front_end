import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiKey, FiLayout, FiSend, FiLogOut } from "react-icons/fi";
import { GoStack } from "react-icons/go";
import { BsHddStack } from "react-icons/bs";
import { Layout, Menu } from "antd";
import logoIcon from "../../../assets/logo.png";
import { googleLogout } from "@react-oauth/google";
import { RiExpandRightLine, RiExpandLeftLine } from "react-icons/ri";
import { TbHeartCheck } from "react-icons/tb";

const { Sider } = Layout;

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pathName, setPathName] = useState(location.pathname);
  const [collapsed, setCollapsed] = useState(false);
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
      label: "Sources",
      icon: <FiKey />,
    },
    {
      key: "/dashboard/Predictions",
      label: "Predictions",
      icon: <FiSend />,
    },
    {
      key: "/dashboard/MyChannels",
      label: "Channels",
      icon: <BsHddStack />,
    },
    {
      key: "/dashboard/Markets",
      label: "Markets",
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
    if (location.pathname) {
      const matchedPath = location.pathname.includes("/dashboard/Feed")
        ? "/dashboard/Feed"
        : location.pathname.includes("/dashboard/LeaderBoards")
        ? "/dashboard/LeaderBoards"
        : location.pathname.includes("/dashboard/Summaries")
        ? "/dashboard/Summaries"
        : location.pathname.includes("/dashboard/Predictions")
        ? "/dashboard/Predictions"
        : location.pathname.includes("/dashboard/MyChannels")
        ? "/dashboard/MyChannels"
        : location.pathname.includes("/dashboard/Markets")
        ? "/dashboard/Markets"
        : location.pathname.includes("/dashboard/Favourites")
        ? "/dashboard/Favourites"
        : location.pathname;

      setPathName(matchedPath);
    }
  }, [location.pathname]);

  useEffect(() => {
    let data = localStorage.getItem("userdata");
    setUserData(JSON.parse(data));
  }, []);

  return (
    <Sider
      trigger={
        <div className="mb-4 mx-[4px]">
          {!collapsed ? (
            <div className="w-full flex pl-6 text-[#ffffff70] items-center h-full text-xl rounded-lg font-raleway gap-2 text-xs py-[10px] hover:bg-[#ffffff20] hover:text-[#ffffff80]">
              {" "}
              <RiExpandLeftLine /> Collapse
            </div>
          ) : (
            <div className="w-full flex justify-center items-center h-full text-xl bg-[#ffffff20] rounded-xl py-[10px]">
              <RiExpandRightLine />
            </div>
          )}
        </div>
      }
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="desktop h-screen border-r-2 hidden md:block border-primary !sticky !top-0 !left-0 font-[600]"
    >
      {!collapsed ? (
        <div className="demo-logo-vertical flex justify-center items-center p-4">
          <img className="logo-icon" alt="" src={logoIcon} />
        </div>
      ) : (
        <div className="demo-logo-vertical flex justify-center items-center p-4">
          <img className="logo-icon" alt="" src={"/images/logo_icon.png"} />
        </div>
      )}
      <span
        className={
          !collapsed
            ? "flex font-poppins pl-5 pt-4 font-bold text-gray500"
            : "flex font-poppins pl-2 pt-4 font-bold text-gray500"
        }
      >
        {"General"}
      </span>
      <Menu
        defaultSelectedKeys={[pathName]}
        selectedKeys={[pathName]}
        mode="inline"
        onClick={(item) => {
          navigate(item.key);
        }}
        className="font-raleway text-xs relative font-[600]"
      >
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
          className="font-[600]"
        >
          {"Logout"}
        </Menu.Item>
      </Menu>
      <div className="flex font-raleway text-xs px-7 w-full gap-2 items-center absolute bottom-12  py-4 text-white rounded-lg">
        <img
          src={userData?.picture}
          width={10}
          height={10}
          className={`rounded-full w-8 `}
        />
        <h4 className={`${!collapsed ? "flex" : "hidden"} font-[600]`}>
          {userData?.given_name}
        </h4>
      </div>
    </Sider>
  );
};

export default Index;
