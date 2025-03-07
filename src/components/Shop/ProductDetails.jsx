import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";

const ProductDetails = () => {
  const { id } = useParams();
  const data = useSelector((state) => state.data.product);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const products = data.find((item) => item.id === parseInt(id));
  if (!products) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details p-6 ">
      <h1
        data-aos="fade-up"
        className="text-4xl sm:text-3xl md:text-2xl font-bold text-center underline mb-6 bg-red-400 p-4"
      >
        {products.title}
      </h1>

      <h2
        data-aos="fade-up"
        data-aos-delay="200"
        className="text-3xl sm:text-xl md:text-lg font-semibold text-black-700 mt-4 text-center"
      >
        ${products.price}
      </h2>

      <img
        data-aos="fade-up"
        data-aos-delay="100"
        src={products.img}
        alt={products.title}
        className="w-full sm:w-72 md:w-96 lg:w-1/2 xl:w-1/3 h-auto object-cover shadow-lg rounded-lg mx-auto mt-6"
      />
    </div>
  );
};

export default ProductDetails;
