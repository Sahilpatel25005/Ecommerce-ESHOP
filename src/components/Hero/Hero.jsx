import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Shered/Button";
import Image1 from "../../assets/Hero/basket.png";
import Image2 from "../../assets/Hero/basket_green.png";
import Image3 from "../../assets/Hero/basket_tomato.png";

const slides = [
  {
    id: 1, img: Image1,
    subtitle: "Straight from local farms to your kitchen",
    title: "Farm Fresh Vegetables",
    title2: "Fresh",
  },
  {
    id: 2, img: Image2,
    subtitle: "Packed with vitamins & minerals",
    title: "Fresh Leafy Greens",
    title2: "Green Leafy",
  },
  {
    id: 3, img: Image3,
    subtitle: "Grown naturally for a richer taste",
    title: "Juicy Organic",
    title2: "Organic",
  },
];

const Hero = ({ handleOrderPopup }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: { opacity: 0, x: 80, scale: 0.95 },
    center: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -80, scale: 0.95 },
  };

  const data = slides[current];

  return (
    <div className="container">
      <div className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] bg-[radial-gradient(circle,#3a6b1b_0%,#0a1a00_100%)] flex justify-center items-center relative">
        <div className="container pb-8 sm:pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="flex flex-col justify-center gap-4 sm:pl-3 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={data.id}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={slideVariants}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-white text-2xl sm:text-6xl lg:text-2xl font-bold"
                  >
                    {data.subtitle}
                  </motion.h1>
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold"
                  >
                    {data.title}
                  </motion.h1>
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-5xl uppercase text-white dark:text-white dark:text-opacity-[0.6] sm:text-[80px] md:text-[100px] xl:text-[150px] font-bold"
                  >
                    {data.title2}
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Button
                      text="Shop By Category"
                      bgColor="bg-primary"
                      textColor="text-white"
                      handler={handleOrderPopup}
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="order-1 sm:order-2 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`img-${data.id}`}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10"
                >
                  <img
                    src={data.img}
                    alt=""
                    className="w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-white w-8" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
