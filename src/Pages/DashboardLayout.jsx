import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
// import { useRecoilState } from "recoil";
import { Content } from "antd/es/layout/layout";
import { Layout } from "antd";
import RouterData from "../Routes";

import DesktopSidebar from "../components/common/sidebar/Sidebar";
import MobileSidebar from "../components/common/sidebar/MobileSidebar";
// import { DesktopSidebar, MobileNavbar } from "components/common";
// import { currentUserState } from "middleware/state";
// import { GetCurrentUser } from "middleware/api";

const DashboardLayout = () => {
  return (
    <Layout>
      <MobileSidebar />
      <Layout hasSider>
        <DesktopSidebar />
        <Content className="!max-h-screen  overflow-y-hidden">
          <RouterData />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
