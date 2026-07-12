import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Cart from "../Cart/Cart";
import Menu_Navlink from "../Menu/Menu_Navlink";
import Loading from "../Layout/Loading";
import { useSelector } from "react-redux";
import apiCall from "../../APIcall/APIcall"; // update path as needed

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = checking auth
  const [Menuopen, setMenuopen] = useState(false);

  const load = useSelector((state) => state.loading.loading);

  const handleMenuOpen = () => setMenuopen(!Menuopen);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await apiCall("/login/me", "GET"); 
        if (res?.user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    verifyAuth();
  }, []);

  // ⏳ While checking auth → show nothing or a loading screen
  if (isAuthenticated === null) {
    return <div className="text-center py-8">Checking authentication...</div>;
  }

  // ❌ Not authenticated → redirect to login
  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Authenticated → render full layout + protected content
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
