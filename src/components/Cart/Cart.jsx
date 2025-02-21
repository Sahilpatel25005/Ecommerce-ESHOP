import React, { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsopen } from "../Slice/HandleCart";
import {
  removeProduct,
  incereseQty,
  dicereseQty,
  fetchCartItems,
} from "../Slice/CartSlice";
import { AiFillDelete } from "react-icons/ai";
import { FaPlus, FaMinus } from "react-icons/fa";

function Cart() {
  const image_url = import.meta.env.VITE_IMAGE_URL;
  const isCartOpen = useSelector((state) => state.handlecart.isopen);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cartdata.cart);

  // Calculate total items & total amount
  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items]
  );
  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty * item.price, 0),
    [items]
  );

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
    <>
      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[28vw] lg:w-[24vw] xl:w-[22vw] bg-white dark:bg-gray-900 dark:text-white shadow-lg z-50 p-6 transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500`}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 bg-gray-300 dark:bg-gray-700 p-2 rounded-full text-xl font-bold hover:bg-gray-400"
          onClick={() => dispatch(setIsopen())}
        >
          ✕
        </button>

        {/* Cart Title */}
        <h1 className="text-2xl font-semibold text-center sm:text-3xl mb-4">
          Your Shopping Cart
        </h1>
        <hr className="mb-4" />

        {/* Cart Items */}
        <div className="max-h-[55vh] overflow-y-auto px-2 space-y-4">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.productid}
                className="flex justify-between items-center bg-yellow-50 dark:bg-gray-800 p-3 rounded-lg shadow-md"
              >
                {/* Product Image & Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={`${image_url}/src/assets/products/${item.image}`}
                    alt={item.name}
                    className="w-[50px] h-[50px] object-cover rounded-md"
                  />
                  <div>
                    <h2 className="text-md font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ${item.price} x {item.qty}
                    </p>
                  </div>
                </div>

                {/* Quantity & Remove Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    className="bg-green-600 text-white p-1 rounded-md hover:bg-green-700"
                    onClick={() => dispatch(incereseQty(item.productid))}
                  >
                    <FaPlus />
                  </button>

                  <span className="px-3 text-lg font-semibold">{item.qty}</span>

                  <button
                    className="bg-red-600 text-white p-1 rounded-md hover:bg-red-700"
                    onClick={() =>
                      item.qty > 1 && dispatch(dicereseQty(item.productid))
                    }
                  >
                    <FaMinus />
                  </button>

                  <button
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700"
                    onClick={() => dispatch(removeProduct(item.productid))}
                  >
                    <AiFillDelete className="text-lg" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h2 className="text-center text-gray-600 dark:text-gray-400 mt-20 text-xl font-serif">
              Oops! Your cart is empty. 🛒
            </h2>
          )}
        </div>

        {/* Cart Footer */}
        <div className="fixed bottom-6 lg:bottom-10 w-full sm:w-[25vw] lg:w-[24vw] xl:w-[22vw] p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-lg">
          <p className="text-lg font-medium">
            Total Items: <span className="font-bold">{totalItems}</span>
          </p>
          <p className="text-lg font-medium">
            Total Amount:{" "}
            <span className="font-bold">${totalAmount.toFixed(2)}</span>
          </p>

          {/* Checkout Button - Optimized for Foldable Screens */}
          <button className="w-full max-w-md lg:max-w-lg bg-green-600 hover:bg-green-700 active:scale-95 text-white py-4 lg:py-5 px-6 rounded-lg text-xl lg:text-2xl font-semibold shadow-lg transition-all duration-300 ease-in-out dark:bg-green-700 dark:hover:bg-green-600">
            Checkout
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
