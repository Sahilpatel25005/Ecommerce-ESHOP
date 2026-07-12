import React from "react";
import { motion } from "framer-motion";
import Button from "../../components/Shered/Button";
import Image1 from "../../assets/cetegory/olives.png";
import Image2 from "../../assets/cetegory/yellow_chilli.png";
import Image3 from "../../assets/cetegory/chilli.png";

const items = [
  {
    id: 1, img: Image1,
    label: "Enjoy", title: "With", name: "Olive",
    btnBg: "bg-primary", btnText: "text-white",
    gradient: "from-black/90 to-black/70",
    imgClass: "w-[320px] absolute bottom-0 lg:top-[5px] -right-4",
  },
  {
    id: 2, img: Image2,
    label: "Enjoy", title: "With", name: "Yellow chilli",
    btnBg: "bg-white", btnText: "text-brandYellow",
    gradient: "from-brandYellow to-brandYellow/90",
    imgClass: "w-[320px] absolute lg:top-[-10px] -right-16",
  },
  {
    id: 3, img: Image3, span: "sm:col-span-2",
    label: "Enjoy", title: "With", name: "Fresh Chilli",
    btnBg: "bg-white", btnText: "text-[#f42c37]",
    gradient: "from-primary to-primary/90",
    imgClass: "w-[250px] absolute top-1/2 -translate-y-1/2 -right-0",
  },
];

const Cetegory = () => {
  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`py-10 pl-5 rounded-3xl bg-gradient-to-br ${item.gradient} text-white relative flex items-end ${item.span || ""}`}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
                className={`mb-4 ${i === 0 ? "mt-20" : "mt-7"}`}
              >
                <p className="mb-[2px] text-gray-400">{item.label}</p>
                <p className="text-2xl font-semibold mb-[2px]">{item.title}</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-3">{item.name}</p>
                <Button text="Browse" bgColor={item.btnBg} textColor={item.btnText} />
              </motion.div>

              <motion.img
                src={item.img}
                alt=""
                initial={{ opacity: 0, scale: 0.8, x: 30 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={item.imgClass}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cetegory;
