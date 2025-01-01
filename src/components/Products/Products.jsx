import React from "react";
import Heading from "../Shered/Heading";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const Products = () => {
  const ProductsData = useSelector((state) => state.data.product);
  const ProductsData2 = useSelector((state) => state.data.product2);

  return (
    <div>
      <div className="container">
        <Heading title="Our Products" subtitle={"Explore Our Products"} />
        <ProductCard data={ProductsData} />
        <ProductCard data={ProductsData2} />
      </div>
    </div>
  );
};

export default Products;
