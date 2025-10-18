import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { order_placed } from "../Slice/OrderPlaceSlice";


const PaymentSuccess = () => {

  // useEffect(() => {
  //   dispatch(order_placed())
  // })

  const dispatch = useDispatch()

  const handleGoHome = () => {
    window.location.href = "http://localhost:5173/shop";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 px-6">
      {/* Success Card */}
      <div className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-md w-full">
        {/* Custom Checkmark Icon */}
        <div className="flex justify-center mb-6">
  <div className="relative w-20 h-20 flex items-center justify-center bg-green-100 rounded-full">
    {/* Circle background */}
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="3"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  </div>
</div>


        <h1 className="text-3xl font-semibold text-green-700 mb-3">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-8">
          Woohoo 🎉 Your payment has been successfully processed.  
          Thank you for shopping with us!
        </p>

        <button
          onClick={handleGoHome}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg font-medium shadow-md transition-all duration-200"
        >
          Continue Shopping
        </button>
      </div>

      <footer className="mt-10 text-gray-500 text-sm">
        Need help?{" "}
        <a href="#" className="text-green-600 hover:underline">
          Contact Support
        </a>
      </footer>
    </div>
  );
};

export default PaymentSuccess;
