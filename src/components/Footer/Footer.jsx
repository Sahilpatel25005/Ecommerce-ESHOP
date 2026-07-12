import React from "react";
import { motion } from "framer-motion";
import { FaMobileAlt } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow } from "react-icons/fa6";

const links = [
  { title: "Home", link: "/#" },
  { title: "About", link: "/#about" },
  { title: "Contact", link: "/#contact" },
  { title: "Blog", link: "/#blog" },
];

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="dark:bg-gray-950"
    >
      <div className="container">
        <div className="grid md:grid-cols-3 pb-20 pt-5 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="py-8 px-4"
          >
            <a href="#" className="text-2xl font-semibold text-primary uppercase tracking-widest sm:text-3xl mb-3">FRESHO</a>
            <p className="text-gray-600 dark:text-white/70 lg:pr-24 pt-3">
              We believe in healthy living. Our vegetables are grown with care, harvested fresh, and delivered straight from local farms to your kitchen.
            </p>
          </motion.div>

          <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10">
            {[0, 1].map((col) => (
              <motion.div
                key={col}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + col * 0.1 }}
                className="py-8 px-4"
              >
                <h1 className="text-xl font-bold sm:text-left mb-3 dark:text-white">
                  {col === 0 ? "Important Links" : "Quick Links"}
                </h1>
                <ul className="space-y-3">
                  {links.map((data, index) => (
                    <li key={index}>
                      <a href={data.link} className="text-gray-600 dark:text-gray-400 hover:dark:text-white hover:text-black duration-300">
                        {data.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="py-8 px-4 col-span-2 sm:col-auto"
            >
              <h1 className="font-bold text-xl sm:text-left mb-3 dark:text-white">Address</h1>
              <div>
                <div className="flex gap-3 items-center dark:text-white">
                  <FaLocationArrow />
                  <p>Rajkot, Gujarat</p>
                </div>
                <div className="flex gap-3 items-center pt-3 dark:text-white">
                  <FaMobileAlt />
                  <p>+91 99999 99999</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
