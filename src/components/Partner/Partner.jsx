import React from "react";
import { motion } from "framer-motion";
import br1 from "../../assets/brand/br-1.png";
import br2 from "../../assets/brand/br-2.png";
import br3 from "../../assets/brand/br-3.png";
import br4 from "../../assets/brand/br-4.png";
import br5 from "../../assets/brand/br-5.png";

const brands = [br1, br2, br3, br4, br5];

const Partner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-8 mt-24 hidden md:block bg-gray-200 dark:bg-white/10"
    >
      <div className="container">
        <div className="grid grid-cols-5 gap-3 place-items-center opacity-50">
          {brands.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt=""
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ scale: 1.15, opacity: 0.8 }}
              className="w-[80px] dark:invert"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Partner;
