import React from "react";
import br1 from "../../assets/brand/br-1.png";
import br2 from "../../assets/brand/br-2.png";
import br3 from "../../assets/brand/br-3.png";
import br4 from "../../assets/brand/br-4.png";
import br5 from "../../assets/brand/br-5.png";

const Partner = () => {
  return (
    <div
      data-aos="zoom-out"
      className="py-8 mt-24 hidden md:block bg-gray-200 dark:bg-white/10"
    >
      <div className="container">
        <div className="grid grid-cols-5 gap-3 place-items-center opacity-50">
          <img src={br1} alt="" className='className="w-[80px] dark:invert' />
          <img src={br2} alt="" className='className="w-[80px] dark:invert' />
          <img src={br3} alt="" className='className="w-[80px] dark:invert' />
          <img src={br4} alt="" className='className="w-[80px] dark:invert' />
          <img src={br5} alt="" className='className="w-[80px] dark:invert' />
        </div>
      </div>
    </div>
  );
};

export default Partner;
