import React, { useEffect } from "react";
import Heading from "../Shered/Heading";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import useApiCall from "../../APIcall/Hook";
import { list_product } from "../Slice/ProductSlice";

const Products = () => {
  const ProductsData2 = useSelector((state) => state.data.product_items);

  const apiCall = useApiCall();

  useEffect(() => {
    apiCall(list_product());
  }, []);

  const product = [];
  for (let i = 0; i < ProductsData2.length; i++) {
    if (
      ProductsData2[i].productid == 1 ||
      ProductsData2[i].productid == 2 ||
      ProductsData2[i].productid == 3 ||
      ProductsData2[i].productid == 4 ||
      ProductsData2[i].productid == 8 ||
      ProductsData2[i].productid == 9 ||
      ProductsData2[i].productid == 10 ||
      ProductsData2[i].productid == 11
    ) {
      product.push(ProductsData2[i]);
    }
  }

  return (
    <div>
      <div className="container">
        <Heading title="Our Products" subtitle={"Explore Our Products"} />
        <ProductCard data={product} />
      </div>
    </div>
  );
};

export default Products;
