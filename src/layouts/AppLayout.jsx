import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
     <header className="sticky top-0 z-10"> <Navbar /> </header>
      {/* child routes render here */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default AppLayout;
