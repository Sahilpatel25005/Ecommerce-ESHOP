// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import ShopCard from "./ShopCard";
// import Heading from "../Shered/Heading";
// import { changeCetegory } from "../Slice/CategorySlice";
// import { list_product } from "../Slice/ProductSlice";

// function Shop() {
//   const { product_items, loading, error } = useSelector((state) => state.data);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(list_product()); // Dispatch API call on component mount
//   }, [dispatch]);

//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       easing: "ease-in-sine",
//       delay: 100,
//       offset: 100,
//     });
//     AOS.refresh();
//   }, []);

//   const categoryArray = ["All", "Watch", "Headphone"];
//   const selectcategory = useSelector((state) => state.category.categorytype);

//   const handleCategory = (category) => {
//     dispatch(changeCetegory(category));
//   };

//   return (
//     <>
//       <div className="container dark:bg-gray-900 dark:text-white duration-200 h-full">
//         <div className="mt-3 ">
//           <Heading
//             title="Make Your Day Special"
//             subtitle="The best Products for you..."
//           />

//           <div className="mb-6 flex gap-5 justify-center sm:justify-start">
//             {categoryArray.map((category, index) => (
//               <button
//                 key={index}
//                 className={`px-2 py-1 shadow-lg bg-slate-50 dark:text-white dark:bg-gray-700 text-gray-900 rounded-md font-semibold duration-200 ${
//                   selectcategory === category &&
//                   "text-white !bg-gray-900 dark:text-gray-900 dark:bg-slate-200"
//                 }`}
//                 onClick={() => handleCategory(category)}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>

//           {error && (
//             <p className="text-center text-red-500">
//               {error.includes("expired")
//                 ? "Session expired. Redirecting to login..."
//                 : error}
//             </p>
//           )}

//           {!loading && !error && <ShopCard data={product_items} />}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Shop;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import ShopCard from "./ShopCard";
import Heading from "../Shered/Heading";
import { changeCetegory } from "../Slice/CategorySlice";
import { list_product } from "../Slice/ProductSlice";

// Import Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Shop() {
  const { product_items, loading, error } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(list_product()); // Fetch products on mount
  }, [dispatch]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    });
    AOS.refresh();
  }, []);

  const categoryArray = ["All", "Watch", "Headphone"];
  const selectcategory = useSelector((state) => state.category.categorytype);

  // Handle category selection with Toast
  const handleCategory = (category) => {
    dispatch(changeCetegory(category));
    toast.info(`Switched to ${category} category`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  // Show Toast for API Errors
  useEffect(() => {
    if (error) {
      toast.error(
        error.includes("expired")
          ? "Session expired. Redirecting to login..."
          : error,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        }
      );

      if (error.includes("expired")) {
        setTimeout(() => (window.location.href = "/login"), 2000);
      }
    }
  }, [error]);

  return (
    <>
      {/* Toast Notifications */}
      <ToastContainer />

      <div className="container dark:bg-gray-900 dark:text-white duration-200 h-full">
        <div className="mt-3">
          <Heading
            title="Make Your Day Special"
            subtitle="The best Products for you..."
          />

          {/* Category Buttons */}
          <div className="mb-6 flex gap-5 justify-center sm:justify-start">
            {categoryArray.map((category, index) => (
              <button
                key={index}
                className={`px-3 py-2 shadow-lg bg-slate-50 dark:text-white dark:bg-gray-700 text-gray-900 rounded-md font-semibold duration-200 ${
                  selectcategory === category &&
                  "text-white !bg-gray-900 dark:text-gray-900 dark:bg-slate-200"
                }`}
                onClick={() => handleCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Show Loading or Error Messages */}
          {loading && (
            <p className="text-center text-blue-500">Loading products...</p>
          )}

          {!loading && !error && <ShopCard data={product_items} />}
        </div>
      </div>
    </>
  );
}

export default Shop;
