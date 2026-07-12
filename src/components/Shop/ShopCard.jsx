import React from "react";
import { motion } from "framer-motion";
import Button from "../Shered/Button";

const ShopCard = ({ data }) => {
  const image_url = import.meta.env.VITE_FRONT_URL;

  return (
    <div className="grid grid-flow-row auto-rows-max justify-center gap-5 place-items-center grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
      {data.map((item, i) => (
        <motion.div
          key={item.productid || item.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -8 }}
          className="group w-[250px]"
        >
          <div className="relative mb-8">
            <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}
              className="w-full aspect-square overflow-hidden rounded-t-xl"
            >
              <img
                src={`${image_url}/products/${item.image}`}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1, backdropFilter: "blur(4px)" }}
              className="absolute inset-0 flex items-center justify-center duration-200 rounded-t-xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  text="Add to Cart"
                  bgColor="bg-primary"
                  textColor="text-white"
                  productData={{
                    productid: item.productid,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    qty: 1,
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

          <div className="leading-7 text-center">
            <h2 className="font-semibold dark:text-white">{item.name}</h2>
            <h2 className="font-bold dark:text-white">₹{item.price}</h2>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ShopCard;
