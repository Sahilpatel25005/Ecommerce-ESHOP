import React from "react";
import { addProduct } from "../Slice/CartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import apiCall from "../../APIcall/APIcall";
import { setLoading } from "../Slice/LoadingSlice";

const Button = ({ text, bgColor, textColor, productData }) => {
  const dispatch = useDispatch();

  if (!productData) {
    return (
      <button
        className={`${bgColor} ${textColor} py-2 px-8 rounded-full`}
        disabled
      >
        Shop Now
      </button>
    );
  }

  const handleaToast = (name) => {
    toast.success(`${name} Added Successfully`);
  };

  const handleAddToCart = async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiCall("/cart/add", "POST", {
        productid: productData.productid,
      });
      if (response.message) {
        const newobj = { ...productData };
        newobj.qty = response.data.qty;

        dispatch(addProduct(newobj));
        handleaToast(productData.name);
      } else {
        toast.error("Failed to add product to cart.");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`${bgColor} ${textColor} py-2 px-8 rounded-full relative z-10 hover:scale-105 duration-300 cursor-pointer`}
    >
      {text}
    </button>
  );
};

export default Button;
