import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import ShopCard from "./ShopCard";
import Heading from "../Shered/Heading";
import { list_product } from "../Slice/ProductSlice";
import useApiCall from "../../APIcall/Hook";

function Shop() {
  const ProductsData = useSelector((state) => state.data.product_items);
  const dispatch = useDispatch();
  const apiCall = useApiCall();

  useEffect(() => {
    apiCall(list_product());
  }, [dispatch]);

  return (
    <div className="dark:bg-gray-900 dark:text-white duration-200 min-h-screen">
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading title="Make Your Day Special" subtitle="The best Products for you..." />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ShopCard data={ProductsData} />
        </motion.div>
      </div>
    </div>
  );
}

export default Shop;
