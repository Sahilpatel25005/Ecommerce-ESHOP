import React from "react";
import Button from "../../components/Shered/Button";
import Image1 from "../../assets/cetegory/gaming.png";
import Image2 from "../../assets/cetegory/vr.png";
import Image3 from "../../assets/cetegory/speaker.png";

const Cetagory2 = () => {
  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className=" sm:col-span-2 py-10 pl-5 rounded-3xl bg-gradient-to-br from-gray-400/90 to-gray-100  text-white relative flex items-end ">
            <div className="mb-5 p-3 ">
              <p className="mb-[2px] text-white">Enjoy</p>
              <p className="text-2xl font-semibold mb-[2px]">With</p>
              <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-3">
                Console
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
              className="w-[250px] absolute top-1/2 -translate-y-1/2 right-6"
            />
          </div>
          <div className="py-10 pl-5 rounded-3xl sm:overflow-hidden bg-gradient-to-br from-brandGreen/90 to-brandGreen/90 text-white relative flex items-start ">
            <div className="mb-[40px] sm:mb-[100px] ">
              <p className="mb-[2px] text-white">Enjoy</p>
              <p className="text-2xl font-semibold mb-[2px]">With</p>
              <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-3">
                Oculus
              </p>
              <Button
                text="Browse"
                bgColor={"bg-white"}
                textColor={"text-brandGreen"}
              />
            </div>

            <img
              src={Image2}
              alt=""
              className="w-[250px] absolute bottom-0 right-2 sm:bottom-[1px] sm:right-[-0.5px]  "
            />
          </div>
          <div className="py-10 pl-5 rounded-3xl bg-gradient-to-br from-brandBlue to-brandBlue/90 text-white relative flex items-start ">
            <div className="mb-[40px] sm:mb-[100px] ">
              <p className="mb-[2px] text-white">Enjoy</p>
              <p className="text-2xl font-semibold mb-[2px]">With</p>
              <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-3">
                Speaker
              </p>
              <Button
                text="Browse"
                bgColor={"bg-white"}
                textColor={"text-brandBlue"}
              />
            </div>
            <img
              src={Image3}
              alt=""
              className="w-[250px] absolute bottom-7 right-2 sm:bottom-0 sm:right-2  "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cetagory2;
