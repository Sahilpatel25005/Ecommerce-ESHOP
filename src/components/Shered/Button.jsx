import React from "react";

const Button = ({ text, bgColor, textColor, handler = () => {} }) => {
  return (
    <button
      onClick={handler}
      className={`${bgColor} ${textColor}  py-2 px-8  rounded-full relative z-10 hover:scale-105  duration-300 cursor-pointer`}
    >
      {text}
    </button>
  );
};

export default Button;
