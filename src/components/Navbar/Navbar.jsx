import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import DarkMode from "./DarkMode";

const MenuLinks = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 2,
    name: "Shop",
    link: "/#shop",
  },
  {
    id: 3,
    name: "About",
    link: "/#about",
  },
  {
    id: 4,
    name: "Blogs",
    link: "/#blog",
  },
];

const DropDown = [
  {
    id: 1,
    name: "Tranding Products",
    link: "/#",
  },
  {
    id: 2,
    name: "Best Selling",
    link: "/#",
  },
  {
    id: 3,
    name: "Top Rated",
    link: "/#",
  },
];

function Navbar({ handleOrderPopup }) {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white relative duration-200  z-40">
      <div className="py-4">
        <div className="container flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <a
              href="#"
              className="text-primary font-semibold text-2xl uppercase tracking-widest sm:text-3xl"
            >
              Eshop
            </a>
            <div className="hidden lg:block ">
              <ul className="flex gap-4 items-center">
                {MenuLinks.map((data, index) => (
                  <li key={index} className="">
                    <a
                      href={data.link}
                      className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200 "
                    >
                      {data.name}
                    </a>
                  </li>
                ))}

                <li className="  group ">
                  <a
                    href="#"
                    className="flex font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200 "
                  >
                    Quick Links
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
                          <a
                            href={data.link}
                            className="text-gray-500 hover:text-black dark:hover:text-white duration-200 inline-block p-2 font-semibold"
                          >
                            {data.name}
                          </a>
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
            <div className="relative  group hidden  sm:block ">
              <input type="text" placeholder="Search" className="search-bar" />
              <FaSearch
                className="text-xl text-gray-600 dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3
              group-hover:text-primary duration-200"
              />
            </div>
            <div className="flex relative">
              <FaShoppingCart
                className="text-xl cursor-pointer"
                onClick={handleOrderPopup}
              />
              <div
                className="bg-primary rounded-lg w-4 h-4 absolute translate-x-3 -translate-y-2
                text-[11px] text-center  text-white  font-semibold  "
              >
                5
              </div>
            </div>
            <div>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
