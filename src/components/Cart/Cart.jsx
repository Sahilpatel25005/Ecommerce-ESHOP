import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsopen } from "../Slice/HandleCart";

function Cart() {
  const isCartOpen = useSelector((state) => state.handlecart.isopen);
  const dispatch = useDispatch();
  const item = useSelector((state) => state.cartdata.cart);
  console.log(item);
  
  

  return (
    <>
      <div
        className={` w-[100vw] h-full sm:w-[25vw] bg-white dark:bg-gray-900 dark:text-white top-0 z-50 right-0 fixed sm:rounded-tl-md sm:rounded-bl-md p-6 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } transition-all duration-500 `}
      >
        <button
          className="dark:bg-gray-700 bg-gray-200 p-2 rounded-[50%] top-2 right-2 fixed text-center w-[44px] text-2xl font-bold"
          onClick={() => dispatch(setIsopen())}
        >
          X
        </button>
        <div className="mt-8">
          <h1 className=" text-2xl font-medium text-center sm:text-3xl">
            Bring Your Item in Cart.
          </h1>
          <hr className="mt-4" />
          <div className="mt-3    dark:bg-gray-900 dark:text-white p-4 rounded-md">
            {item.map((item) => (
              <div className="flex justify-between items-center mt-4 bg-yellow-50 dark:bg-gray-800 shadow-md p-2 rounded-md">
                <div className="flex items-center gap-4">
                  <img
                    src={item.img}
                    alt=""
                    className="w-[50px] h-[50px] object-cover"
                  />
                  <div>
                    <h1 className="text-lg font-medium">{item.title}</h1>
                    <p className="text-sm font-medium">Price : {item.price}</p>
                  </div>
                </div>
                <button className="bg-red-600 text-white px-2 py-1 rounded-md">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="fixed bottom-3 w-[88vw] flex flex-col gap-4">
          <p className="sm:text-xl text-sm font-medium ">
            Total Items :{" "}
            <span className="sm:text-xl text-sm font-medium ">45</span>{" "}
          </p>
          <p className="sm:text-2xl font-medium mb-2">
            TOTAL AMOUNT :{" "}
            <span className="sm:text-2xl text-sm font-medium ">2345678</span>
          </p>
          <button className="sm:w-[22.5vw] w-full bg-green-600 sm:py-3 py-2 rounded-md text-xl font-bold sm:text-2xl">
            Cheak Out
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
