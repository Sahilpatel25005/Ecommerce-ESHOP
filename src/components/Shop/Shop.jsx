import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import ShopCard from "./ShopCard";
import Heading from "../Shered/Heading";

function Shop() {
  const ProductsData = useSelector((state) => state.data.product);
  const ProductsData2 = useSelector((state) => state.data.product2);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <div className="container dark:bg-gray-900 dark:text-white duration-200">
        <div className="mt-3">
          <Heading
            title="Make Your Day Special"
            subtitle={"The best Products for you..."}
          />
          <ShopCard data={ProductsData} />
          <ShopCard data={ProductsData2} />
          <ShopCard data={ProductsData} />
          <ShopCard data={ProductsData2} />
          <ShopCard data={ProductsData} />
          <ShopCard data={ProductsData2} />
        </div>
      </div>
    </>
  );
}

export default Shop;
