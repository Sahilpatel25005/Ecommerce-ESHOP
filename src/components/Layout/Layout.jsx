import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Cart from "../Cart/Cart";

function Layout() {
  return (
    <>
      <Navbar />
      <Cart />
      <Outlet />
    </>
  );
}

export default Layout;
