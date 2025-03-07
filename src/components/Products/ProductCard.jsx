import React from "react";
import Button from "../Shered/Button";

const ProductCard = ({ data }) => {
  const image_url = import.meta.env.VITE_IMAGE_URL;

  return (
    <div className="mb-10 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 place-items-center ">
        {data.map((data) => (
          <div
            data-aos="fade-up"
            data-aos-delay={data.asoDelay}
            key={data.id}
            className="group"
          >
            <div className="relative mb-8 ">
              <img
                src={`${image_url}/src/assets/products/${data.image}`}
                alt=""
                className="h-[180px] w-[260px] object-cover rounded-md  "
              />
              <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200 rounded-md">
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
            <div className="leading-7 ">
              <h2 className="font-semibold">{data.name}</h2>
              <h2 className="font-bold">${data.price}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
