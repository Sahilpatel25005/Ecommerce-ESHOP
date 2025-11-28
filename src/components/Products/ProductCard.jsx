import React from "react";
import Button from "../Shered/Button";

const ProductCard = ({ data }) => {
  const image_url = import.meta.env.VITE_FRONT_URL;

  return (
    <div
      className="grid grid-flow-row auto-rows-max justify-center gap-5 place-items-center
             grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
    >
      {data.map((data) => (
        <div
          data-aos="fade-up"
          data-aos-delay={data.asoDelay}
          key={data.id}
          className="group w-[250px]" // ⭐ fixed product width (doesn't change)
        >
          <div className="relative mb-8">
            <div className="w-full aspect-square overflow-hidden rounded-t-xl">
              <img
                src={`${image_url}/products/${data.image}`}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            </div>

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

          <div className="leading-7 text-center">
            <h2 className="font-semibold">{data.name}</h2>
            <h2 className="font-bold">₹{data.price}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
