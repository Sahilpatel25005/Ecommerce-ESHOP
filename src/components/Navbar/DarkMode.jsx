import React, { useEffect, useState } from "react";
import LightButton from "../../assets/DL/light-mode-button.png";
import DarkButton from "../../assets/DL/dark-mode-button.png";

function DarkMode() {
  const [isdark, setIsdark] = useState("false");
  const [dark, setDark] = useState(LightButton);

  const darkModeOn = () => {
    const element = document.documentElement;
    if (isdark) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  };

  const toggel = () => {
    if (isdark == false) {
      setDark(LightButton);
    } else {
      setDark(DarkButton);
    }
    setIsdark(!isdark);
    darkModeOn();
  };

  return (
    <div className="">
      <img
        src={dark}
        alt="light"
        className="w-12 transition-all duration-300 p-0 mt-1"
        onClick={toggel}
      />
    </div>
  );
}

export default DarkMode;
