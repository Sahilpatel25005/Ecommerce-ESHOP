import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import ShopCard from "./ShopCard";
import Heading from "../Shered/Heading";
import { changeCetegory } from "../Slice/CategorySlice";
import { list_product } from "../Slice/ProductSlice";

import useApiCall from "../../APIcall/Hook";

function Shop() {
  const ProductsData = useSelector((state) => state.data.product_items);

  const dispatch = useDispatch();
  const apiCall = useApiCall();

  useEffect(() => {
    apiCall(list_product());
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

  const handleCategory = (category) => {
    dispatch(changeCetegory(category));
  };

  return (
    <>
      <div className="container dark:bg-gray-900 dark:text-white duration-200 h-full">
        <div className="mt-3 ">
          <Heading
            title="Make Your Day Special"
            subtitle={"The best Products for you..."}
          />
          <div className="mb-6 flex gap-5 justify-center sm:justify-start">
            {categoryArray.map((category, index) => (
              <button
                key={index}
                className={`px-2 py-1 shadow-lg bg-slate-50 dark:text-white dark:bg-gray-700  text-gray-900  rounded-md font-semibold duration-200 ${
                  selectcategory === category &&
                  "text-white !bg-gray-900 dark:!text-gray-900  dark:!bg-slate-200"
                }`}
                onClick={() => handleCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <ShopCard data={ProductsData} />
        </div>
      </div>
    </>
  );
}

export default Shop;
