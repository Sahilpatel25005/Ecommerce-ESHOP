import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Cart from "../Cart/Cart";
import Menu_Navlink from "../Menu/Menu_Navlink";

function Layout() {

    const [Menuopen, setMenuopen] = React.useState(false);
  
   const handleMenuOpen = () => {
      setMenuopen(!Menuopen);
    };
  
  return (
    <>
      <Menu_Navlink handleMenuOpen={handleMenuOpen}  Menuopen = { Menuopen} />
      <Navbar  handleMenuOpen={handleMenuOpen}/>
      <Cart />
      
      <Outlet />
    </>
  );
}

export default Layout;
