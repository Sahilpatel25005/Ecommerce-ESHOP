import React from "react";
import { addProduct } from "../Slice/CartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Button = ({ text, bgColor, textColor, productData }) => {
  const dispatch = useDispatch();

  const handleaToast = (name) => {
    toast.success(`${name} Added Successfully`);
  };

  return (
    <button
      onClick={() => {
        productData && dispatch(addProduct(productData));
        handleaToast(productData.title);
      }}
      className={`${bgColor} ${textColor}  py-2 px-8  rounded-full relative z-10 hover:scale-105  duration-300 cursor-pointer`}
    >
      {text}
    </button>
  );
};

export default Button;
