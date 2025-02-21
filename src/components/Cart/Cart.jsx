import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsopen } from "../Slice/HandleCart";
import { useEffect } from "react";
import {
  removeProduct,
  incereseQty,
  dicereseQty,
  fetchCartItems,
} from "../Slice/CartSlice";
import { AiFillDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

function Cart() {
  const image_url = import.meta.env.VITE_IMAGE_URL;
  const isCartOpen = useSelector((state) => state.handlecart.isopen);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cartdata.cart);
  const totalItems = useMemo(() => {
    return items.reduce((totalItems, item) => totalItems + item.qty, 0);
  }, [items]);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

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
          className="dark:bg-gray-700 bg-gray-200 p-2 rounded-[50%] top-2 right-2 fixed text-center w-[44px] text-2xl font-bold"
          onClick={() => dispatch(setIsopen())}
        >
          X
        </button>
        <div className="mt-8">
          <h1 className="text-2xl font-medium text-center sm:text-3xl">
            Bring Your Item in Cart.
          </h1>
          <hr className="mt-4" />
          <div className="mt-3 dark:bg-gray-900 dark:text-white p-4 rounded-md">
            {/* Scrollable Cart Items Container */}
            <div className="max-h-[50vh] overflow-y-auto">
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
          <button className="sm:w-full w-full bg-green-600 py-2 rounded-md text-xl font-bold sm:text-2xl">
            Cheak Out
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;

// import React, { useMemo, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { setIsopen } from "../Slice/HandleCart";
// import {
//   removeProduct,
//   incereseQty,
//   dicereseQty,
//   fetchCartItems,
// } from "../Slice/CartSlice";
// import { AiFillDelete } from "react-icons/ai";
// import { FaPlus, FaMinus } from "react-icons/fa";

// function Cart() {
//   const image_url = import.meta.env.VITE_IMAGE_URL;
//   const isCartOpen = useSelector((state) => state.handlecart.isopen);
//   const dispatch = useDispatch();
//   const items = useSelector((state) => state.cartdata.cart);

//   // Calculate total items & total amount
//   const totalItems = useMemo(
//     () => items.reduce((sum, item) => sum + item.qty, 0),
//     [items]
//   );
//   const totalAmount = useMemo(
//     () => items.reduce((sum, item) => sum + item.qty * item.price, 0),
//     [items]
//   );

//   useEffect(() => {
//     dispatch(fetchCartItems());
//   }, [dispatch]);

//   return (
//     <>
//       {/* Cart Sidebar */}
//       <div
//         className={`fixed top-0 right-0 h-full w-full sm:w-[28vw] bg-white dark:bg-gray-900 dark:text-white shadow-lg z-50 p-6 transform ${
//           isCartOpen ? "translate-x-0" : "translate-x-full"
//         } transition-transform duration-500`}
//       >
//         {/* Close Button */}
//         <button
//           className="absolute top-3 right-3 bg-gray-300 dark:bg-gray-700 p-2 rounded-full text-xl font-bold hover:bg-gray-400"
//           onClick={() => dispatch(setIsopen())}
//         >
//           ✕
//         </button>

//         {/* Cart Title */}
//         <h1 className="text-2xl font-semibold text-center sm:text-3xl mb-4">
//           Your Shopping Cart
//         </h1>
//         <hr className="mb-4" />

//         {/* Cart Items */}
//         <div className="max-h-[55vh] overflow-y-auto px-2 space-y-4">
//           {items.length > 0 ? (
//             items.map((item) => (
//               <div
//                 key={item.productid}
//                 className="flex justify-between items-center bg-yellow-50 dark:bg-gray-800 p-3 rounded-lg shadow-md"
//               >
//                 {/* Product Image & Info */}
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={`${image_url}/src/assets/products/${item.image}`}
//                     alt={item.name}
//                     className="w-[50px] h-[50px] object-cover rounded-md"
//                   />
//                   <div>
//                     <h2 className="text-md font-semibold">{item.name}</h2>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       ${item.price} x {item.qty}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Quantity & Remove Buttons */}
//                 <div className="flex items-center gap-2">
//                   <button
//                     className="bg-green-600 text-white p-1 rounded-md hover:bg-green-700"
//                     onClick={() => dispatch(incereseQty(item.productid))}
//                   >
//                     <FaPlus />
//                   </button>

//                   <span className="px-3 text-lg font-semibold">{item.qty}</span>

//                   <button
//                     className="bg-red-600 text-white p-1 rounded-md hover:bg-red-700"
//                     onClick={() =>
//                       item.qty > 1 && dispatch(dicereseQty(item.productid))
//                     }
//                   >
//                     <FaMinus />
//                   </button>

//                   <button
//                     className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700"
//                     onClick={() => dispatch(removeProduct(item.productid))}
//                   >
//                     <AiFillDelete className="text-lg" />
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <h2 className="text-center text-gray-600 dark:text-gray-400 mt-20 text-xl font-serif">
//               Oops! Your cart is empty. 🛒
//             </h2>
//           )}
//         </div>

//         {/* Cart Footer */}
//         <div className="fixed bottom-3 w-full sm:w-[25vw] p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-lg">
//           <p className="text-lg font-medium">
//             Total Items: <span className="font-bold">{totalItems}</span>
//           </p>
//           <p className="text-lg font-medium">
//             Total Amount:{" "}
//             <span className="font-bold">${totalAmount.toFixed(2)}</span>
//           </p>

//           <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 active:scale-95 text-white py-3 sm:py-4 px-6 rounded-lg text-lg sm:text-xl font-semibold shadow-md transition-all duration-300 ease-in-out dark:bg-green-700 dark:hover:bg-green-600">
//             Checkout
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Cart;
