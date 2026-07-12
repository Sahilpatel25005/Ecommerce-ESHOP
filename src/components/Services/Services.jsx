import React from "react";
import { motion } from "framer-motion";
import { FaCarSide, FaCheckCircle, FaWallet, FaHeadphonesAlt } from "react-icons/fa";

const services = [
  { id: 1, icon: <FaCarSide className="text-4xl md:text-5xl text-primary" />, title: "Free Shipping", description: "Free Shipping On All Order" },
  { id: 2, icon: <FaCheckCircle className="text-4xl md:text-5xl text-primary" />, title: "Safe Money", description: "30 Days Money Back" },
  { id: 3, icon: <FaWallet className="text-4xl md:text-5xl text-primary" />, title: "Secure Payment", description: "All Payment Secure" },
  { id: 4, icon: <FaHeadphonesAlt className="text-4xl md:text-5xl text-primary" />, title: "Online Support 24/7", description: "Technical Support 24/7" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const Services = () => {
  return (
    <div>
      <div className="container my-14 md:my-20">
        <motion.div
          className="grid gap-4 gap-y-8 grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((data) => (
            <motion.div
              key={data.id}
              variants={childVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {data.icon}
              </motion.div>
              <div>
                <p className="lg:text-xl font-bold dark:text-white">{data.title}</p>
                <p className="text-gray-400 text-sm">{data.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
