
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../Shered/Button";

import AOS from "aos";
import "aos/dist/aos.css";

const ProductDetails = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.data.product_items);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  if (!products) {
    return <div>Loading...</div>;
  }

  const product = products.find((item) => item.productid === parseInt(id));
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="bg-red-200 w-full md:w-3/4 p-8 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10">
          <img
            src={`${import.meta.env.VITE_IMAGE_URL}/src/assets/products/${
              product.image
            }`} // Correct dynamic image path
            alt={product.name}
            className="w-[300px] h-[300px] object-cover rounded-md"
          />
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg mb-4">{product.description}</p>
            <h2 className="text-2xl font-bold text-primary mb-4">
              ${product.price}
            </h2>
            <div className="flex items-center space-x-3 mb-6">
              <Button
                text={"Add to Cart"}
                bgColor={"bg-primary"}
                textColor={"text-white"}
                productData={{
                  productid: product.productid,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  qty: 1,
                }}
              />
              <button className="bg-gray-300 text-black px-6 py-2 rounded-md">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
