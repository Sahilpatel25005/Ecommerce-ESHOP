import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CheakoutDetails } from "../Slice/CheakoutSlice";
import useApiCall from "../../APIcall/Hook";

function Checkout() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [loading, setLoading] = useState(false);
  const [promocode, setPromocode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [discount, setDiscount] = useState(0);

  const details = useSelector((state) => state.cheakout.cheakout_list);
  const apiCall = useApiCall();

  // 🔹 Fetch checkout details on mount
  useEffect(() => {
    apiCall(CheakoutDetails());
  }, []);

  const user = {
    'First Name': details.FirstName,
    'Last Name': details.LastName,
    'Email': details.Email,
    'Mobile Number': details.MobileNnumber,
    'Address': details.Address,
  };

  // 🔹 Apply Promo Code (Backend Validation)
  const handleApplyPromo = async () => {
    if (!promocode.trim()) {
      setPromoError("Please enter a promo code.");
      return;
    }

    setLoading(true);
    setPromoError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${baseUrl}/user_details?promocode_name=${promocode}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (
        data.user_detail &&
        data.user_detail.promocode_value !== "Invalid promo code"
      ) {
        setDiscount(data.user_detail.promocode_value);
        setPromoApplied(true);
        setPromoError("");
      } else {
        setPromoError("Invalid or expired promo code.");
        setPromoApplied(false);
        setDiscount(0);
      }
    } catch (err) {
      setPromoError("Failed to verify promo code.");
      setPromoApplied(false);
      setDiscount(0);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Payment
  const handlePayment = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${baseUrl}/stripe_payment/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ "promocode" : promocode }),
        }
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.detail || "Failed to create payment session");
      window.location.href = data.url;
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Checkout
        </h1>

        {/* 🧾 User Details */}
        <div className="space-y-4">
          {Object.entries(user).map(([key, val]) => (
            <div
              key={key}
              className="flex justify-between border-b border-gray-300 pb-2"
            >
              <span className="capitalize text-gray-600 dark:text-gray-400">
                {key}:
              </span>
              <span className="text-gray-800 dark:text-white">
                {val || "-"}
              </span>
            </div>
          ))}
        </div>

        {/* 🎟️ Promo Code Section */}
        <div className="mt-8">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Promo Code
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={promocode}
              onChange={(e) => {
                setPromocode(e.target.value);
                setPromoApplied(false); // ✅ allow reapplying
                setPromoError("");
                setDiscount(0);
              }}
              placeholder="Enter your promo code"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleApplyPromo}
              disabled={loading}
              className={`px-6 py-2 rounded-lg font-semibold text-white transition ${
                promoApplied
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gradient-to-r from-green-500 to-lime-600 hover:opacity-90"
              }`}
            >
              {promoApplied ? "Applied ✓" : "Apply"}
            </button>
          </div>

          {promoError && (
            <p className="text-red-500 mt-2 text-sm">{promoError}</p>
          )}
          {promoApplied && (
            <p className="text-green-500 mt-2 text-sm">
              Promo applied! Discount: ₹{discount}
            </p>
          )}
        </div>

        {/* 💳 Payment Button */}
        <div className="mt-10 text-center">
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`bg-gradient-to-r from-green-500 to-lime-600 text-white py-3 px-8 rounded-full shadow-lg transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {loading ? "Processing..." : "Pay with Stripe"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
