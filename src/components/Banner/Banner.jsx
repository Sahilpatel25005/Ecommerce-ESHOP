import React from "react";
import { motion } from "framer-motion";

function Banner({ data }) {
  const slideLeft = { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } };
  const slideUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
  const scaleIn = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } };

  return (
    <div className="min-h-[550px] flex justify-center items-center py-12">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.5, staggerChildren: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-white rounded-3xl"
          style={{ backgroundColor: data.bgColor }}
        >
          <motion.div variants={slideLeft} className="p-6 sm:p-8">
            <motion.p variants={slideUp} className="text-sm">{data.discount}</motion.p>
            <motion.h1 variants={slideUp} className="text-4xl lg:text-7xl font-bold uppercase">{data.title}</motion.h1>
            <motion.p variants={slideUp} className="text-sm">{data.date}</motion.p>
          </motion.div>

          <motion.div variants={scaleIn} className="h-full flex items-center">
            <img
              src={data.image} alt=""
              className="scale-150 w-[250px] md:w-[340px] mx-auto drop-shadow-2xl object-cover"
            />
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } }}
            className="flex flex-col justify-center gap-4 p-6 sm:p-8"
          >
            <motion.p variants={slideUp} className="text-xl font-bold">{data.title2}</motion.p>
            <motion.p variants={slideUp} className="text-3xl sm:text-5xl font-bold">{data.title3}</motion.p>
            <motion.p variants={slideUp} className="text-sm tracking-wide leading-5">{data.title4}</motion.p>
            <motion.div variants={slideUp}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ color: data.bgColor }}
                className="bg-white py-2 px-4 rounded-full font-semibold"
              >
                Shop Now
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Banner;
