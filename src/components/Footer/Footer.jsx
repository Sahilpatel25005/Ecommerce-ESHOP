import React from "react";
import { FaMobileAlt } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
} from "react-icons/fa6";

const FooterLinks = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
  {
    title: "Blog",
    link: "/#blog",
  },
];

const Footer = () => {
  return (
    <div className=" dark:bg-gray-950">
      <div className="container">
        <div className="grid md:grid-cols-3 pb-20 pt-5 gap-4">
          <div className="py-8 px-4">
            <a
              href="#"
              className="text-2xl font-semibold text-primary uppercase tracking-widest sm:text-3xl mb-3 "
            >
              Eshop
            </a>

            <p className="text-gray-600 dark:text-white/70  lg:pr-24 pt-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum
              reiciendis porro fugit libero, molestiae cupiditate!
            </p>

            <p className="text-gray-500 mt-4">
              Made with 💖 by The Coding Journey
            </p>

            <a
              href="#"
              className="mt-4 inline-block bg-primary py-1 px-3 text-sm rounded-2xl"
            >
              Vist My Github Profile
            </a>
          </div>

          <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10">
            <div className="py-8 px-4">
              <h1 className="text-xl font-bold sm:text-left mb-3">
                Important Links
              </h1>
              <ul className="space-y-3">
                {FooterLinks.map((data, index) => (
                  <li key={index}>
                    <a
                      href={data.link}
                      className="text-gray-600 dark:text-gray-400 hover:dark:text-white hover:text-black duration-300"
                    >
                      {data.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="py-8 px-4">
              <h1 className="text-xl font-bold sm:text-left mb-3">
                Quick Links
              </h1>
              <ul className="space-y-3">
                {FooterLinks.map((data, index) => (
                  <li key={index}>
                    <a
                      href={data.link}
                      className="text-gray-600 dark:text-gray-400 hover:dark:text-white hover:text-black duration-300"
                    >
                      {data.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="py-8 px-4 col-span-2 sm:col-auto">
              <h1 className="font-bold text-xl  sm:text-left mb-3">Address</h1>
              <div className="">
                <div className="flex gap-3 items-center">
                  <FaLocationArrow />
                  <p>Noida , Uttar Pradesh</p>
                </div>
                <div className="flex gap-3 items-center pt-3">
                  <FaMobileAlt />
                  <p>+91 99999 99999</p>
                </div>
                <div className="flex items-center mt-6 gap-3">
                  <a href="#">
                    <FaInstagram className="text-3xl  hover:text-primary duration-300" />
                  </a>
                  <a href="#">
                    <FaFacebook className="text-3xl  hover:text-primary duration-300" />
                  </a>
                  <a href="#">
                    <FaLinkedin className="text-3xl  hover:text-primary duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
