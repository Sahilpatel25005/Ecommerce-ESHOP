import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaShoppingCart, FaCaretDown, FaSignOutAlt } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import DarkMode from "./DarkMode";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsopen } from "../Slice/HandleCart";
import { searchItem } from "../Slice/Search";
import useApiCall from "../../APIcall/Hook";

function Navbar({ handleMenuOpen }) {
  const apiCall = useApiCall();
  const DropDown = useSelector((state) => state.dropdown.DropdownData);
  const MenuLinks = useSelector((state) => state.navlink.MenuLinks);
  const cardItem = useSelector((state) => state.cartdata.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCart = () => dispatch(setIsopen());

  const handleLogout = async () => {
    try {
      await apiCall("/login/logout", "POST");
      navigate("/login");
    } catch (err) {
      navigate("/login");
    }
  };

  return (
    <motion.div
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-white dark:bg-gray-900 dark:text-white relative duration-200 z-30 ${
        scrolled ? "shadow-xl" : "shadow-lg"
      }`}
    >
      <div className="py-4">
        <div className="container flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <NavLink
              to="/Home"
              className="text-primary font-semibold text-2xl uppercase tracking-widest sm:text-3xl hidden sm:block"
            >
              Fresho
            </NavLink>

            <button onClick={handleMenuOpen} className="lg:hidden">
              <TiThMenu className="text-primary font-semibold text-2xl uppercase tracking-widest sm:text-3xl sm:hidden" />
            </button>

            <div className="hidden lg:block">
              <ul className="flex gap-4 items-center">
                {MenuLinks.map((data, index) => (
                  <li key={index}>
                    <NavLink
                      to={data.link}
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-red-600" : "text-gray-500"
                        } lg:hover:bg-transparent lg:border-0 hover:text-black dark:hover:text-white lg:p-0 font-semibold`
                      }
                    >
                      {data.name}
                    </NavLink>
                  </li>
                ))}

                <li className="group relative">
                  <a className="flex font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200 cursor-pointer">
                    My Orders
                    <span>
                      <FaCaretDown className="mt-1 mx-1 text-gray-500 group-hover:rotate-180 duration-300" />
                    </span>
                  </a>
                  <div
                    className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:hover:text-white"
                    style={{ transition: "opacity 0.2s, transform 0.2s" }}
                  >
                    <ul className="space-y-2">
                      {DropDown.map((data, index) => (
                        <li key={index} className="hover:bg-primary/20 px-1 rounded-md">
                          <NavLink
                            to={data.link}
                            className="text-gray-500 hover:text-black dark:hover:text-white duration-200 inline-block p-2 font-semibold"
                          >
                            {data.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-between items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex relative"
            >
              <FaShoppingCart
                className="text-xl cursor-pointer"
                onClick={handleCart}
              />
              <AnimatePresence>
                {cardItem.length >= 1 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="bg-primary rounded-lg w-4 h-4 absolute translate-x-3 -translate-y-2 text-[11px] text-center text-white font-semibold"
                  >
                    {cardItem.length}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <div>
              <DarkMode />
            </div>

            <div className="hidden lg:block">
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.1, color: "#f42c37" }}
                whileTap={{ scale: 0.9 }}
                className="text-xl text-gray-600 hover:text-black dark:hover:text-white duration-200"
              >
                <FaSignOutAlt className="text-xl" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Navbar;
