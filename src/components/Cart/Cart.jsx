import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsopen } from "../Slice/HandleCart";
import {
  removeProduct,
  incereseQty,
  dicereseQty,
  fetchCartItems,
} from "../Slice/CartSlice";
import { AiFillDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import useApiCall from "../../APIcall/Hook";
import { CheakoutDetails } from "../Slice/CheakoutSlice";

function Cart() {
  const image_url = import.meta.env.VITE_IMAGE_URL;
  const isCartOpen = useSelector((state) => state.handlecart.isopen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cartdata.cart);
  const apiCall = useApiCall();

  const totalItems = useMemo(() => {
    return items.reduce((totalItems, item) => totalItems + item.qty, 0);
  }, [items]);

  useEffect(() => {
    apiCall(fetchCartItems());
  }, []);

  const totalAmount = useMemo(() => {
    return items.reduce(
      (totalItems, item) => totalItems + item.qty * item.price,
      0
    );
  }, [items]);

  return (
    <>
      <div
        className={`w-[100vw] h-full sm:w-[28vw] bg-white dark:bg-gray-900 dark:text-white top-0 z-50 right-0 fixed sm:rounded-tl-md sm:rounded-bl-md p-6 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } transition-all duration-500`}
      >
        <button
          className=" w-full flex justify-end "
          onClick={() => dispatch(setIsopen())}
        >
          <ImCross className="bg-gray-200 p-2 rounded-full  text-3xl text-black" />
        </button>

        <div className="mt-8">
          <h1 className="text-2xl font-medium text-center sm:text-3xl">
            Bring Your Item in Cart.
          </h1>
          <hr className="mt-4" />
          <div className="mt-3 dark:bg-gray-900 dark:text-white p-4 rounded-md">
            {/* Scrollable Cart Items Container */}
            <div className="max-h-[50vh] overflow-y-auto sc">
              {items.length > 0 ? (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center mt-4 bg-yellow-50 dark:bg-gray-800 shadow-md p-2 rounded-md"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={`${image_url}/src/assets/products/${item.image}`}
                        alt=""
                        className="w-[50px] h-[50px] object-cover"
                      />
                      <div>
                        <h1 className="text-sm font-medium">{item.name}</h1>
                        <p className="text-sm font-medium">
                          Price : {item.price}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 sm:gap-0">
                        <button
                          className="bg-green-600 text-white px-1 py-1 rounded-md"
                          onClick={() => dispatch(incereseQty(item.productid))}
                        >
                          <FaPlus />
                        </button>

                        <span className="px-2 text-xl font-medium sm:text-[15px]">
                          {item.qty}
                        </span>

                        <button
                          className="bg-red-600 text-white px-1 py-1 rounded-md"
                          onClick={() =>
                            item.qty > 1 &&
                            dispatch(dicereseQty(item.productid))
                          }
                        >
                          <FaMinus />
                        </button>
                      </div>

                      <button
                        className="bg-red-600 text-white px-2 py-2 rounded-md"
                        onClick={() => {
                          console.log("Deleting product:", item.productid);
                          dispatch(removeProduct(item.productid));
                        }}
                      >
                        <AiFillDelete className="text-xl" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="sm:mt-[50%] mt-[80%] flex justify-center font-serif text-xl">
                  oops cart is empty.!!
                </h1>
              )}
            </div>
          </div>
        </div>
        <div className="fixed bottom-3 w-[88vw] sm:w-[25vw] px-2 flex flex-col gap-4 bg-slate-100 dark:bg-gray-900 rounded-md">
          <p className="sm:text-xl text-sm font-medium ">
            Total Items :{" "}
            <span className="sm:text-xl text-sm font-bold ">{totalItems}</span>{" "}
          </p>
          <p className="sm:text-xl font-medium mb-2">
            TOTAL AMOUNT :{" "}
            <span className="sm:text-xl text-sm font-bold ">{totalAmount}</span>
          </p>
          <button
            className={`sm:w-full w-full bg-green-600  py-2 rounded-md text-xl font-bold sm:text-2xl ${
              items.length === 0 && "cursor-not-allowed opacity-50"
            }`}
            disabled={items.length === 0}
            onClick={() => {
              navigate("cheakout");
              dispatch(setIsopen());
              apiCall(CheakoutDetails());
            }}
          >
            Cheak Out
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
