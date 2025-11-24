import React from "react";

const PaymentFailed = () => {
  const URL = import.meta.env.VITE_FRONT_URL;
  const handleRetry = () => {
    window.location.href = `${URL}/cheakout`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100 px-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-md w-full">
        <h1 className="text-3xl font-semibold text-red-600 mb-3">
          Payment Failed!
        </h1>
        <p className="text-gray-600 mb-8">
          Oops! Something went wrong with your payment. Please try again or
          check your payment details.
        </p>

        <button
          onClick={handleRetry}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-lg font-medium shadow-md transition-all duration-200"
        >
          Try Again
        </button>
      </div>

      <footer className="mt-10 text-gray-500 text-sm">
        Need help?{" "}
        <a href="#" className="text-red-600 hover:underline">
          Contact Support
        </a>
      </footer>
    </div>
  );
};

export default PaymentFailed;
