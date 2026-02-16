import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import SideBar from "../components/SideBar";

const AppLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <Navbar />
        {/* Main content */}
        <Outlet />
      </div>

      {/* Sidebar */}
      <SideBar />
    </div>
  );
};

export default AppLayout;
