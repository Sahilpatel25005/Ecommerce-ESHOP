import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Cart from "../Cart/Cart";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
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
