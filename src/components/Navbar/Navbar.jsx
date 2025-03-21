import React from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaCaretDown,
  FaSignOutAlt,
} from "react-icons/fa";
import DarkMode from "./DarkMode";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate here
import { useDispatch, useSelector } from "react-redux";
import { setIsopen } from "../Slice/HandleCart";
import { searchItem } from "../Slice/Search";
import { TiThMenu } from "react-icons/ti";

function Navbar({ handleMenuOpen }) {
  const DropDown = useSelector((state) => state.dropdown.DropdownData);
  const MenuLinks = useSelector((state) => state.navlink.MenuLinks);
  const cardItem = useSelector((state) => state.cartdata.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use the navigate hook here

  const handleCart = () => {
    dispatch(setIsopen());
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white relative duration-200 shadow-lg z-30 ">
      <div className="py-4">
        <div className="container flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <a
              href="#"
              className="text-primary font-semibold text-2xl uppercase tracking-widest sm:text-3xl hidden sm:block  "
            >
              Eshop
            </a>

            <button onClick={handleMenuOpen} className="lg:hidden">
              <TiThMenu className="text-primary font-semibold text-2xl uppercase tracking-widest sm:text-3xl sm:hidden" />
            </button>

            <div className="hidden lg:block  ">
              <ul className="flex gap-4 items-center">
                {MenuLinks.map((data, index) => (
                  <li key={index} className="">
                    <NavLink
                      to={data.link}
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-red-600" : "text-gray-500"
                        }  lg:hover:bg-transparent lg:border-0 hover:text-black dark:hover:text-white lg:p-0  font-semibold`
                      }
                    >
                      {data.name}
                    </NavLink>
                  </li>
                ))}

                <li className="  group ">
                  <a className="flex font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200 ">
                    My Orders
                    <span>
                      <FaCaretDown className="mt-1 mx-1 text-gray-500 group-hover:rotate-180 duration-300 " />
                    </span>
                  </a>
                  <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:hover:text-white">
                    <ul className="space-y-2">
                      {DropDown.map((data, index) => (
                        <li
                          key={index}
                          className="hover:bg-primary/20 px-1 rounded-md"
                        >
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
            {/* Searchbar section */}
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="search-bar "
                onChange={(e) => dispatch(searchItem(e.target.value))}
              />
              <FaSearch
                className="text-xl text-gray-600 bg-white dark:bg-gray-900 dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3
              group-hover:text-primary duration-200"
              />
            </div>
            <div className="flex relative">
              <FaShoppingCart
                className="text-xl cursor-pointer"
                onClick={handleCart}
              />
              <div
                className={`bg-primary rounded-lg w-4 h-4 absolute translate-x-3 -translate-y-2
                text-[11px] text-center  text-white  font-semibold ${
                  cardItem.length >= 1 ? "block" : "hidden"
                } `}
              >
                {cardItem.length}
              </div>
            </div>
            <div>
              <DarkMode />
            </div>

            <div className="hidden lg:block">
              <button
                onClick={handleLogout}
                // className="font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200"
                className="text-xl text-gray-600 hover:text-black dark:hover:text-white absolute top-1/2 -translate-y-1/2 right-3
              group-hover:text-primary duration-200"
              >
                <FaSignOutAlt className="text-xl" />
                
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
