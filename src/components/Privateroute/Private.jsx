import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Cart from "../Cart/Cart";

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <Cart />
      <Outlet />
    </>
  );
};

export default PrivateRoute;
