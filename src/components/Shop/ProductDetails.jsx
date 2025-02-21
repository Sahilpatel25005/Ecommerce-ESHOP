// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import Button from "../Shered/Button";
// import { list_product } from "../Slice/ProductSlice"; // Ensure this is correctly imported

// import AOS from "aos";
// import "aos/dist/aos.css";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { product_items, loading } = useSelector((state) => state.data);
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       easing: "ease-in-out",
//       once: true,
//     });

//     if (!product_items.length) {
//       dispatch(list_product()); // Fetch products if not already available
//     }
//   }, [dispatch, product_items.length]);

//   useEffect(() => {
//     if (product_items.length > 0) {
//       const foundProduct = product_items.find(
//         (item) => item.productid === parseInt(id)
//       );
//       setProduct(foundProduct || null);
//     }
//   }, [id, product_items]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   return (
//     <div className="bg-black min-h-screen flex items-center justify-center">
//       <div className="bg-red-200 w-full md:w-3/4 p-8 rounded-lg shadow-lg">
//         <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10">
//           <img
//             src={`${import.meta.env.VITE_IMAGE_URL}/src/assets/products/${
//               product.image
//             }`}
//             alt={product.name}
//             className="w-[300px] h-[300px] object-cover rounded-md"
//           />
//           <div className="md:w-1/2">
//             <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//             <p className="text-lg mb-4">{product.description}</p>
//             <h2 className="text-2xl font-bold text-primary mb-4">
//               ${product.price}
//             </h2>
//             <div className="flex items-center space-x-3 mb-6">
//               <Button
//                 text={"Add to Cart"}
//                 bgColor={"bg-primary"}
//                 textColor={"text-white"}
//                 productData={{
//                   productid: product.productid,
//                   name: product.name,
//                   price: product.price,
//                   image: product.image,
//                   qty: 1,
//                 }}
//               />
//               <button className="bg-gray-300 text-black px-6 py-2 rounded-md">
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Shered/Button";
import { list_product } from "../Slice/ProductSlice"; // Ensure this is correctly imported

import AOS from "aos";
import "aos/dist/aos.css";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product_items, loading } = useSelector((state) => state.data);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });

    if (!product_items.length) {
      dispatch(list_product()); // Fetch products if not already available
    }
  }, [dispatch, product_items.length]);

  useEffect(() => {
    if (product_items.length > 0) {
      const foundProduct = product_items.find(
        (item) => item.productid === parseInt(id)
      );
      setProduct(foundProduct || null);
    }
  }, [id, product_items]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-red-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 w-full max-w-4xl p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={`${import.meta.env.VITE_IMAGE_URL}/src/assets/products/${
                product.image
              }`}
              alt={product.name}
              className="w-[300px] h-[300px] object-cover rounded-md shadow-lg"
            />
          </div>

          {/* Product Details */}
          <div className="text-gray-900 dark:text-white">
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              {product.description}
            </p>
            <h2 className="text-2xl font-bold text-primary mb-4">
              ${product.price}
            </h2>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-3 sm:space-y-0">
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
                className="w-full sm:w-auto px-6 py-2 rounded-md shadow-md"
              />
              <button className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-md transition-all shadow-md">
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
