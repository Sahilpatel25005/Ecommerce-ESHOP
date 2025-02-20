import React from "react";
import { FadeLoader } from "react-spinners";

function Loading() {
  return (
    <div className=" w-[100vw] h-full sm:w-w-full bg-transparent backdrop-blur-sm dark:text-white top-0 z-40 right-0 fixed sm:rounded-tl-md sm:rounded-bl-md p-6 flex justify-center items-center ">
      <FadeLoader
        color="#0005ea"
        height={18}
        radius={20}
        speedMultiplier={3}
        width={5}
      />
    </div>
  );
}

export default Loading;
