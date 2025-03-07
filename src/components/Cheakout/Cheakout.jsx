import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useApiCall from "../../APIcall/Hook";
import { order_placed } from "../Slice/OrderPlaceSlice";
import { fetchCartItems } from "../Slice/CartSlice";

function Cheakout() {
  const [loading, setLoading] = useState(false);
  const details = useSelector((state) => state.cheakout.cheakout_list);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiCall = useApiCall();

  const user = {
    fname: details.fname,
    lname: details.lname,
    email: details.email,
    mobile: details.monumber,
    address: details.address,
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      // 1️⃣ Place the order
      await apiCall(order_placed());

      // 2️⃣ Refresh the cart after placing order (optional)
      await apiCall(fetchCartItems());

      // 3️⃣ Navigate to the current order page
      navigate("/current_order");
    } catch (error) {
      console.error("Order placement failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold mb-10 text-gray-800 dark:text-white text-center">
          Checkout Details
        </h1>

        <div className="space-y-6">
          {Object.entries(user).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between border-b border-gray-300 dark:border-gray-700 pb-3"
            >
              <span className="text-gray-600 dark:text-gray-400 capitalize">
                {key.replace("_", " ")}:
              </span>
              <span className="text-gray-800 dark:text-white">{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
            Payment Method
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="credit-card"
                name="payment"
                className="w-5 h-5 accent-blue-500"
                defaultChecked
              />
              <label
                htmlFor="credit-card"
                className="text-gray-700 dark:text-gray-300"
              >
                Credit Card
              </label>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="paypal"
                name="payment"
                className="w-5 h-5 accent-blue-500"
              />
              <label
                htmlFor="paypal"
                className="text-gray-700 dark:text-gray-300"
              >
                PayPal
              </label>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="cod"
                name="payment"
                className="w-5 h-5 accent-blue-500"
              />
              <label htmlFor="cod" className="text-gray-700 dark:text-gray-300">
                Cash on Delivery
              </label>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            className={`bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-8 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cheakout;
