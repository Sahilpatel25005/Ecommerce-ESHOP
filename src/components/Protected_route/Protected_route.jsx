import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRout = ({ element }) => {
  const cartItem = useSelector((state) => state.cartdata.cart);
  return cartItem.length > 0 ? element : <Navigate to={"/"} />;
};

export default ProtectedRout;
