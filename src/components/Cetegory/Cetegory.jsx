import React from "react";
import Button from "../../components/Shered/Button";
import Image1 from "../../assets/cetegory/earphone.png";
import Image2 from "../../assets/cetegory/watch.png";
import Image3 from "../../assets/cetegory/macbook.png";

const Cetegory = () => {
  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="py-10 pl-5 rounded-3xl bg-gradient-to-br from-black/90 to-black/70 text-white relative flex items-end ">
            <div className="mb-4 mt-20">
              <p className="mb-[2px] text-gray-400">Enjoy</p>
              <p className="text-2xl font-semibold mb-[2px]">With</p>
              <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-3">
                Earphone
              </p>
              <Button
                text="Browse"
                bgColor={"bg-primary"}
                textColor={"text-white"}
              />
            </div>

            <img
              src={Image1}
              alt=""
              className="w-[320px] absolute bottom-0 lg:top-[40px] -right-4"
            />
          </div>
          <div className="py-10 pl-5 rounded-3xl bg-gradient-to-br from-brandYellow to-brandYellow/90 text-white relative flex items-end ">
            <div className="mb-4 mt-7">
              <p className="mb-[2px] text-white">Enjoy</p>
              <p className="text-2xl font-semibold mb-[2px]">With</p>
              <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-3">
                Gadget
              </p>
              <Button
                text="Browse"
                bgColor={"bg-white"}
                textColor={"text-brandYellow"}
              />
            </div>
            <img
              src={Image2}
              alt=""
              className="w-[320px] absolute  lg:top-[40px] -right-4"
            />
          </div>
          <div className=" sm:col-span-2 py-10 pl-5 rounded-3xl bg-gradient-to-br from-primary to-primary/90 text-white relative flex items-end ">
            <div className="mb-4 mt-7 ">
              <p className="mb-[2px] text-white ">Enjoy</p>
              <p className="text-2xl font-semibold mb-[2px]">With</p>
              <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-3">
                Laptop
              </p>
              <Button
                text="Browse"
                bgColor={"bg-white"}
                textColor={"text-[#f42c37]"}
              />
            </div>
            <img
              src={Image3}
              alt=""
              className="w-[250px] absolute top-1/2 -translate-y-1/2 -right-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cetegory;
