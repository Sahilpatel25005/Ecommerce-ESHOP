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

  const details = useSelector((state) => state.cheakout.cheakout_list || {});
  const apiCall = useApiCall();

  // fetch checkout details on mount
  useEffect(() => {
    apiCall(CheakoutDetails());
  }, []);

  // Derived values
  const totalAmount = Number(details.total_amount || 0);
  const payableAmount = Math.max(0, (totalAmount - Number(discount || 0)));

  const user = {
    "First Name": details?.user_detail?.FirstName,
    "Last Name": details?.user_detail?.LastName,
    "Email": details?.user_detail?.Email,
    "Mobile Number": details?.user_detail?.MobileNnumber,
    "Address": details?.user_detail?.Address,
  };

  // Apply Promo Code (Backend Validation + client-side rules)
  const handleApplyPromo = async () => {
    setPromoError("");
    setPromoApplied(false);
    setDiscount(0);

    const code = (promocode || "").trim().toUpperCase();
    if (!code) {
      setPromoError("Please enter a promo code.");
      return;
    }

    if (!totalAmount || totalAmount <= 0) {
      setPromoError("Invalid total amount.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      // Call backend endpoint that returns promocode details by name
      const res = await fetch(`${baseUrl}/promocodes/${encodeURIComponent(code)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        // show server message if present
        const detail = data?.detail || data?.message || "Promo validation failed";
        setPromoError(detail);
        setPromoApplied(false);
        setDiscount(0);
        return;
      }

      // expected response shape: { promocode: { name: "...", value: 20, active: true } }
      const promoValue = Number(data?.promocode?.value ?? 0);

      if (!promoValue || promoValue <= 0) {
        setPromoError("Promo has no value or is invalid.");
        setPromoApplied(false);
        setDiscount(0);
        return;
      }

      // Rule 1: promo value cannot be >= total amount
      if (promoValue >= totalAmount) {
        setPromoError("Promo value cannot be equal to or greater than the total amount.");
        setPromoApplied(false);
        setDiscount(0);
        return;
      }

      // Rule 2: after applying promo, payable must be >= 50
      const newPayable = totalAmount - promoValue;
      if (newPayable < 50) {
        setPromoError("Cannot apply promo — payable amount would fall below ₹50.");
        setPromoApplied(false);
        setDiscount(0);
        return;
      }

      // Success: apply promo
      setDiscount(promoValue);
      setPromoApplied(true);
      setPromoError("");
    } catch (err) {
      console.error(err);
      setPromoError("Failed to verify promo code. Try again later.");
      setPromoApplied(false);
      setDiscount(0);
    } finally {
      setLoading(false);
    }
  };

  // Payment
  const handlePayment = async () => {
    // final guard rails
    if (!totalAmount || totalAmount <= 0) {
      alert("Invalid total amount.");
      return;
    }
    if (promoApplied) {
      if (Number(discount) <= 0) {
        alert("Invalid discount.");
        return;
      }
    }

    const finalPayable = payableAmount;

    if (finalPayable < 50) {
      alert("We do not process payments under ₹50. Adjust your order or promo code.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      // Send promo code and let backend re-validate as well (important)
      const res = await fetch(`${baseUrl}/stripe_payment/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body: JSON.stringify({ promocode: promoApplied ? promocode : null }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || data.message || "Failed to create payment session");

      // Redirect to stripe checkout url returned by backend
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert(err.message || "Payment failed to start");
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

        {/* User Details */}
        <div className="space-y-4">
          {Object.entries(user).map(([key, val]) => (
            <div key={key} className="flex justify-between border-b border-gray-300 pb-2">
              <span className="capitalize text-gray-600 dark:text-gray-400">{key}:</span>
              <span className="text-gray-800 dark:text-white">{val || "-"}</span>
            </div>
          ))}
        </div>

        {/* Amount summary */}
        <div className="mt-6 space-y-2 text-right">
          <div className="flex justify-between">
            <span className="text-gray-600">Total:</span>
            <span className="font-semibold">₹{totalAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Discount:</span>
            <span className="font-semibold text-green-600">- ₹{Number(discount || 0).toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-700">Payable:</span>
            <span className="text-xl font-bold">₹{payableAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Promo Code Section */}
        <div className="mt-8">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Promo Code</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={promocode}
              onChange={(e) => {
                setPromocode(e.target.value.toUpperCase());
                setPromoApplied(false);
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
                promoApplied ? "bg-green-500 hover:bg-green-600" : "bg-gradient-to-r from-green-500 to-lime-600 hover:opacity-90"
              }`}
            >
              {loading ? "Checking..." : promoApplied ? "Applied ✓" : "Apply"}
            </button>
          </div>

          {promoError && <p className="text-red-500 mt-2 text-sm">{promoError}</p>}
          {promoApplied && <p className="text-green-500 mt-2 text-sm">Promo applied! Discount: ₹{discount}</p>}
        </div>

        {/* Payment Button */}
        <div className="mt-10 text-center">
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`bg-gradient-to-r from-green-500 to-lime-600 text-white py-3 px-8 rounded-full shadow-lg transition ${loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
          >
            {loading ? "Processing..." : `Pay ₹${payableAmount.toFixed(2)} with Stripe`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
