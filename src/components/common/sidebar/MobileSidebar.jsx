import React, { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { Drawer, Menu, Space } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { FiKey, FiLayout, FiSend, FiLogOut } from "react-icons/fi";
import { GoStack } from "react-icons/go";
import { MdOutlineSubject } from "react-icons/md";
import { BsHddStack } from "react-icons/bs";
// import { useRecoilState } from 'recoil';

// import Button from "../button";
// // import { SetStorage } from 'middleware/cache';
// import { Paths, SidebarConst, TOKENS } from 'utils/constants';
// import { currentUserState } from 'middleware/state';

// interface LinkItem {
//   label: React.ReactNode;
//   key: React.Key;
//   icon?: React.ReactNode;
//   disabled?: boolean;
// }

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  //   const [currentUser, setCurrentUserState] = useRecoilState(currentUserState);

  //   const { email, first_name, last_name } = currentUser;

  const generalItems = [
    {
      key: "/Feed",
      label: "Feed",
      icon: <GoStack />,
    },
    {
      key: "/LeaderBoards",
      label: "Leaderboards",
      icon: <FiLayout />,
    },
    {
      key: "/Summaries",
      label: "Summaries",
      icon: <FiKey />,
    },
    {
      key: "/Predictions",
      label: "Predictions",
      icon: <FiSend />,
    },
    {
      key: "/MyChannels",
      label: "MyChannels",
      icon: <BsHddStack />,
    },
    {
      key: "/Favorites",
      label: "Favorites",
      icon: <BsHddStack />,
    },
  ];

  //   const supportItems: LinkItem[] = [
  //     {
  //       key: Paths.Feedback,
  //       label: SidebarConst.Feedback,
  //       icon: <MdOutlineSubject />,
  //     },
  //     {
  //       key: Paths.Profile,
  //       label: `${first_name + " " + last_name}`,
  //       icon: <AiOutlineUser />,
  //       disabled: true,
  //     },
  //   ];

  function handleLogout() {
    // SetStorage(TOKENS.ACCESS_TOKEN, '');
    // SetStorage(TOKENS.REFRESH_TOKEN, '');
    navigate("/");
  }

  function handleFeedback() {
    window.open("https://forms.gle/BMLEm7QYyngN3yXdA", "_blank");
  }

  return (
    <>
      <button
        // variant="default"
        onClick={() => setOpen(true)}
        // icon={<HiOutlineMenuAlt1 className="!w-6 !h-full text-black" />}
      >
        <HiOutlineMenuAlt1 className="!w-6 !h-full text-black flex md:hidden" />
      </button>
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
            if (item.key === "/Feedback") {
              handleFeedback();
            } else {
              navigate(item.key);
            }
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

          {/* <span className="flex font-poppins pl-5 pt-4 font-bold text-gray600">
            {SidebarConst.Support}
          </span> */}

          {/* Support items */}
          {/* {supportItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon} disabled={item.disabled}>
              {item.label}
            </Menu.Item>
          ))} */}

          <Menu.Item key="/" icon={<FiLogOut />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};

export default App;
