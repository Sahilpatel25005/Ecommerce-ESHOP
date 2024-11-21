import React from "react";
import { FaCarSide } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { FaHeadphonesAlt } from "react-icons/fa";

const Services = () => {
  const ServiceData = [
    {
      id: 1,
      icon: <FaCarSide className="text-4xl md:text-5xl text-primary" />,
      title: "Free Shipping",
      description: "Free Shipping On All Order",
    },
    {
      id: 2,
      icon: <FaCheckCircle className="text-4xl md:text-5xl text-primary" />,
      title: "Safe Money ",
      description: "30 Days Money Back",
    },
    {
      id: 3,
      icon: <FaWallet className="text-4xl md:text-5xl text-primary" />,
      title: "Secure Payment",
      description: "All Payment Secure",
    },
    {
      id: 4,
      icon: <FaHeadphonesAlt className="text-4xl md:text-5xl text-primary" />,
      title: "Online Supoort 24/7",
      description: "Technical Support 24/7",
    },
  ];
  return (
    <div>
      <div className="container my-14 md:my-20">
        <div className="grid gap-4 gap-y-8 grid-cols-2 lg:grid-cols-4">
          {ServiceData.map((data) => (
            <div
              className="flex flex-col sm:flex-row gap-4  items-start"
              key={data.id}
            >
              {data.icon}

              <div>
                <p className="lg:text-xl font-bold">{data.title}</p>
                <p className="text-gray-400 text-sm">{data.description} </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
