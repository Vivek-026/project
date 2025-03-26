import React from "react";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex min-h-screen">
      {/* Navbar on the left */}
      <Navbar />

      {/* Main content on the right */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;