import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import Navbar from "../Navbar/Navbar";
import Cart from "../Cart/Cart";
import Menu_Navlink from "../Menu/Menu_Navlink";
import Loading from "../Layout/Loading";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const [Menuopen, setMenuopen] = React.useState(false);
  const load = useSelector((state) => state.loading.loading);

  const handleMenuOpen = () => {
    setMenuopen(!Menuopen);
  };

  return (
    <>
      {load && <Loading />}

      <Menu_Navlink handleMenuOpen={handleMenuOpen} Menuopen={Menuopen} />
      <Navbar handleMenuOpen={handleMenuOpen} />
      <Cart />
      <Outlet />
    </>
  );
};

export default PrivateRoute;
