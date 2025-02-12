import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

function Order() {
    const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);
  return (
    <div className='fixed top-0 left-0 w-full h-full z-50 bg-white flex flex-col items-center justify-center dark:bg-gray-900'>
      {loading ? (
        <HashLoader
        color="#0900f6"
        size={150}
        speedMultiplier={1}
      />
      ) : (
        <div className="flex flex-col text-center ">
          <h2 className="text-3xl font-bold tracking-wide">
            Order successfull !!
          </h2>

          <p className=" text-2xl font-semibold mt-3">
            Your Order has been successfully placed.
          </p>

          <a href="/" className=" underline font-semibold mt-3 text-blue-800">
            Back to Home..
          </a>
        </div>
      )}
    </div>
  )
}

export default Order
