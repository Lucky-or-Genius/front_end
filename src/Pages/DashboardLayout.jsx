import React from "react";
import { Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import { Layout } from "antd";

import DesktopSidebar from "../components/common/sidebar/Sidebar";
import MobileSidebar from "../components/common/sidebar/MobileSidebar";

const DashboardLayout = () => {
  return (
    <div className="bg-primary w-full flex justify-center">
      <Layout className="max-w-[1580px] w-full">
        <MobileSidebar />
        <Layout hasSider>
          <DesktopSidebar />
          <Content className="!max-h-screen overflow-y-hidden">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default DashboardLayout;
