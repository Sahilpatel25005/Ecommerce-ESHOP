import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LightButton from "../../assets/DL/light-mode-button.png";
import DarkButton from "../../assets/DL/dark-mode-button.png";

function DarkMode() {
  const [isdark, setIsdark] = useState(false);

  useEffect(() => {
    if (isdark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isdark]);

  const toggle = () => setIsdark((prev) => !prev);

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="cursor-pointer"
    >
      <motion.img
        key={isdark ? "dark" : "light"}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        src={isdark ? DarkButton : LightButton}
        alt="toggle theme"
        className="w-12 transition-all duration-300 p-0 mt-1"
        onClick={toggle}
      />
    </motion.div>
  );
}

export default DarkMode;
