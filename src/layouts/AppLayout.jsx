import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      {/* child routes render here */}
      <Outlet />
    </>
  );
};

export default AppLayout;
