import React, { useEffect, useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useApiCall from "../../APIcall/Hook";
import { order_placed } from "../Slice/OrderPlaceSlice";
import { fetchCartItems } from "../Slice/CartSlice";

function Cheakout() {
  const [loading, setLoading] = useState(false);
  const details = useSelector((state) => state.cheakout.cheakout_list);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const apiCall = useApiCall();

  const user = {
    fname: details.fname,
    lname: details.lname,
    email: details.email,
    mobile: details.monumber,
    address: details.address,
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      console.log("Placing order...");
      const data = await dispatch(order_placed()).unwrap();
      console.log("Order API Response:", data);
      
      if (!data || data.error) {
        throw new Error(data?.error || "Order placement failed");
      }

      await apiCall(fetchCartItems());

      const { amount, currency, orderid } = data;

      if (data.error) {
        throw new Error(orderData.error);
      }

      const options = {
        key: import.meta.env.VITE_RAZOREPAY_KEY,
        amount: amount * 100,
        currency: currency,
        name: "Your eShop",
        description: "Order Payment",
        order_id: orderid,
        handler: function (response) {
          console.log("✅ Razorpay Handler Triggered!");
          console.log("Payment Response:", response);

          if (response && response.razorpay_payment_id) {
            console.log("✅ Payment Successful. Navigating...");
            alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
            setTimeout(() => {
              navigate("/current_order");
            }, 1000);
          } else {
            console.error("❌ Payment failed or missing response:", response);
          }
        },
        prefill: {
          name: user.fname + " " + user.lname,
          email: user.email,
          contact: user.mobile,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Order placement failed in catch:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold mb-10 text-gray-800 dark:text-white text-center">Checkout Details</h1>
        
        <div className="space-y-6">
          {Object.entries(user).map(([key, value]) => (
            <div key={key} className="flex justify-between border-b border-gray-300 dark:border-gray-700 pb-3">
              <span className="text-gray-600 dark:text-gray-400 capitalize">{key.replace("_", " ")}: </span>
              <span className="text-gray-800 dark:text-white">{value}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Payment Method</h2>
          <button
            className={`bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-8 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Processing Payment..." : "Pay with Razorpay"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cheakout;
