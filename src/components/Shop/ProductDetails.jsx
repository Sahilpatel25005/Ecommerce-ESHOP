import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const data = useSelector((state) => state.data.product);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050810]">
        <div className="w-10 h-10 border-3 border-[#00ff88] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const product = data.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050810]">
        <p className="text-white/50">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050810] p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl mx-auto rounded-[28px] p-8 relative overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <motion.img
              src={product.img}
              alt={product.title}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md h-auto object-cover rounded-2xl shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold text-white"
            >
              {product.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {product.description || "Fresh and organic produce straight from the farm."}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-4xl font-black"
              style={{
                background: "linear-gradient(135deg, #00ff88, #00d4ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ${product.price}
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ y: -3, boxShadow: "0 20px 40px rgba(0,255,136,0.35)" }}
              whileTap={{ scale: 0.96 }}
              className="px-8 py-3 rounded-2xl font-bold text-sm"
              style={{
                background: "linear-gradient(135deg, #00ff88, #00c46a)",
                color: "#001a0d",
              }}
            >
              Add to Cart
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
