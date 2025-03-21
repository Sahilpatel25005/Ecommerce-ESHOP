import React, { useState } from "react";
import Button from "../Shered/Button";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa6";

const ShopCard = ({ data }) => {
  const selectcategory = useSelector((state) => state.category.categorytype);
  const search = useSelector((state) => state.search.search);
  const image_url = import.meta.env.VITE_IMAGE_URL;
  const [rating, setRatings] = useState({});

  const handleRating = (productId, ratingValue) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: ratingValue,
    }));
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="pb-10 h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 place-items-center ">
          {data
            .filter((item) => {
              if (selectcategory === "All") {
                const searchitems = item.name
                  .toLowerCase()
                  .includes(search.toLowerCase());
                if (searchitems) {
                  return item;
                }
              } else {
                return (
                  selectcategory === item.categoryname &&
                  item.name.toLowerCase().includes(search.toLowerCase())
                );
              }
            })
            .map((data) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.asoDelay}
                key={data.id}
                className="group  w-full p-5 rounded-md shadow-lg duration-200 dark:shadow-gray-800"
              >
                <div className="relative mb-8 flex justify-center items-center bg-gray-200">
                  <img
                    src={`${image_url}/src/assets/products/${data.image}`}
                    alt=""
                    className="h-[290px] w-[290px] object-cover rounded-md "
                  />

                  <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-400 rounded-md">
                    <Button
                      text={"Add to Cart"}
                      bgColor={"bg-primary"}
                      textColor={"text-white"}
                      productData={{
                        productid: data.productid,
                        name: data.name,
                        price: data.price,
                        image: data.image,
                        qty: 1,
                      }}
                    />
                  </div>
                </div>
                <div className="leading-7   ml-5">
                  <h2 className="font-semibold text-xl">{data.name}</h2>

                  <h2 className="font-bold text-2xl">${data.price}</h2>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2  pt-2">
                      {[...Array(5)].map((_, index) => {
                        const starValue = index + 1;
                        return (
                          <FaStar
                            key={index}
                            className={`cursor-pointer ${
                              starValue <= rating[data.productid]
                                ? "text-yellow-500 !"
                                : "text-gray-300"
                            }`}
                            onClick={() =>
                              handleRating(data.productid, starValue)
                            }
                            size={25}
                          />
                        );
                      })}
                    </div>
                    <h1 className="text-2xl font-bold">
                      {rating[data.productid] || 0}.0
                    </h1>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ShopCard;
