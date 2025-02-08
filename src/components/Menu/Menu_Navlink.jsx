import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";

function Menu_Navlink({ handleMenuOpen, Menuopen }) {
  const MenuLinks = useSelector((state) => state.navlink.MenuLinks);
  const DropDown = useSelector((state) => state.dropdown.DropdownData);

  return (
    <>
      
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-900 z-50 shadow-lg 
        transform ${Menuopen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-500 ease-in-out`}
      >
        <button className="mt-8 w-full  flex justify-end px-12" onClick={handleMenuOpen}>
              <p className="bg-gray-600 p-2 rounded-full px-4 text-2xl text-white">X</p>
            </button>
        <div className="h-full w-full flex justify-center items-center">
          <div>
            
            <ul className="flex gap-4 flex-col items-center">
              {MenuLinks.map((data, index) => (
                <li key={index}>
                  <NavLink
                    to={data.link}
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200 ${
                        isActive ? "text-red-600" : "text-gray-500"
                      } hover:text-black dark:hover:text-white font-semibold`
                    }
                  >
                    {data.name}
                  </NavLink>
                </li>
              ))}

              <li className="relative group">
                <a
                  href="#"
                  className="flex font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200"
                >
                  Quick Links
                  <span>
                    <FaCaretDown className="mt-1 mx-1 text-gray-500 group-hover:rotate-180 duration-300" />
                  </span>
                </a>
                <div className="absolute hidden group-hover:block w-[200px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2">
                  <ul className="space-y-2">
                    {DropDown.map((data, index) => (
                      <li key={index} className="hover:bg-primary/20 px-1 rounded-md">
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
      </div>
    </>
  );
}

export default Menu_Navlink;
