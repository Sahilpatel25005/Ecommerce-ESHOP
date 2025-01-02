import React from "react";
import Button from "../Shered/Button";
import { Toaster } from "react-hot-toast";

const ShopCard = ({ data }) => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="mb-10 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 place-items-center ">
          {data.map((data) => (
            <div
              data-aos="fade-up"
              data-aos-delay={data.asoDelay}
              key={data.id}
              className="group  w-full p-5 rounded-md shadow-lg duration-200"
            >
              <div className="relative mb-8 flex justify-center items-center">
                <img
                  src={data.img}
                  alt=""
                  className="h-[290px] w-[290px] object-cover rounded-md "
                />
                <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-400 rounded-md">
                  <Button
                    text={"Add to Cart"}
                    bgColor={"bg-primary"}
                    textColor={"text-white"}
                    productData={{
                      id: data.id,
                      title: data.title,
                      price: data.price,
                      img: data.img,
                      qty: 1,
                    }}
                  />
                </div>
              </div>
              <div className="leading-7   ml-5">
                <h2 className="font-semibold text-xl">{data.title}</h2>
                <h2 className="font-bold text-2xl">${data.price}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopCard;
