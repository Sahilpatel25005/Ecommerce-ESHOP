import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { setIsopen } from "../Slice/HandleCart";
import {
  removeProduct, incereseQty, dicereseQty, fetchCartItems,
} from "../Slice/CartSlice";
import { AiFillDelete } from "react-icons/ai";
import { FaPlus, FaMinus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";
import useApiCall from "../../APIcall/Hook";

function Cart() {
  const image_url = import.meta.env.VITE_FRONT_URL;
  const isCartOpen = useSelector((state) => state.handlecart.isopen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cartdata.cart);
  const apiCall = useApiCall();

  const totalItems = useMemo(() => items.reduce((t, i) => t + i.qty, 0), [items]);
  const totalAmount = useMemo(() => items.reduce((t, i) => t + i.qty * i.price, 0), [items]);

  useEffect(() => { apiCall(fetchCartItems()); }, []);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => dispatch(setIsopen())}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-0 right-0 h-full w-full sm:w-[28vw] p-6"
            style={{
              background: "rgba(15,20,30,0.95)",
              backdropFilter: "blur(24px) saturate(180%)",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShoppingBag size={20} className="text-[#00ff88]" />
                Cart
              </h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => dispatch(setIsopen())}
                className="p-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <ImCross className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }} />
              </motion.button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto space-y-3 pr-1">
              {items.length > 0 ? (
                items.map((item, i) => (
                  <motion.div
                    key={item.id || item.productid}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <img
                      src={`${image_url}/products/${item.image}`}
                      alt=""
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{item.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>₹{item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => item.qty > 1 && dispatch(dicereseQty(item.productid))}
                          className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
                          style={{ background: "rgba(244,44,55,0.15)", color: "#f42c37" }}
                        >
                          <FaMinus size={10} />
                        </motion.button>
                        <span className="text-sm font-semibold text-white w-5 text-center">{item.qty}</span>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => dispatch(incereseQty(item.productid))}
                          className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
                          style={{ background: "rgba(45,204,111,0.15)", color: "#2dcc6f" }}
                        >
                          <FaPlus size={10} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => dispatch(removeProduct(item.productid))}
                          className="ml-auto"
                          style={{ color: "rgba(244,44,55,0.5)" }}
                        >
                          <AiFillDelete />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-16"
                >
                  <ShoppingBag size={48} style={{ color: "rgba(255,255,255,0.1)" }} />
                  <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>Your cart is empty</p>
                </motion.div>
              )}
            </div>

            {items.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-6 space-y-3"
                style={{ background: "rgba(15,20,30,0.98)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex justify-between text-sm">
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>Total Items</span>
                  <span className="text-white font-semibold">{totalItems}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>Total Amount</span>
                  <span className="text-[#00ff88] font-bold">₹{totalAmount}</span>
                </div>
                <motion.button
                  whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(0,255,136,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { navigate("/cheakout"); dispatch(setIsopen()); }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm"
                  style={{
                    background: "linear-gradient(135deg, #00ff88, #00c46a)",
                    color: "#001a0d",
                  }}
                >
                  Checkout
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Cart;
