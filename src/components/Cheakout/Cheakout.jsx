import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ShoppingBag, Tag, CreditCard, Sparkles } from "lucide-react";
import { CheakoutDetails } from "../Slice/CheakoutSlice";
import useApiCall from "../../APIcall/Hook";

const getCookieToken = () => {
  const accessTokenCookie = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("access_token="));
  return accessTokenCookie
    ? decodeURIComponent(accessTokenCookie.slice("access_token=".length)).replace(/^"|"$/g, "")
    : null;
};

const getAuthHeaders = () => {
  const token = getCookieToken();
  return token ? { Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}` } : {};
};

function Checkout() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [promocode, setPromocode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [discount, setDiscount] = useState(0);

  const details = useSelector((state) => state.cheakout.cheakout_list || {});
  const apiCall = useApiCall();

  useEffect(() => { apiCall(CheakoutDetails()); }, []);

  const totalAmount = Number(details.total_amount || 0);
  const payableAmount = Math.max(0, totalAmount - Number(discount || 0));

  const user = {
    "First Name": details?.user_detail?.FirstName,
    "Last Name": details?.user_detail?.LastName,
    Email: details?.user_detail?.Email,
    "Mobile Number": details?.user_detail?.MobileNnumber,
    Address: details?.user_detail?.Address,
  };

  const handleApplyPromo = async () => {
    setPromoError("");
    setPromoApplied(false);
    setDiscount(0);
    const code = (promocode || "").trim().toUpperCase();
    if (!code) { setPromoError("Please enter a promo code."); return; }
    if (!totalAmount || totalAmount <= 0) { setPromoError("Invalid total amount."); return; }
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/promocodes/${encodeURIComponent(code)}`, {
        method: "GET", credentials: "include",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      });
      const data = await res.json();
      if (!res.ok) { setPromoError(data?.detail || data?.message || "Promo validation failed"); return; }
      const promoValue = Number(data?.promocode?.value ?? 0);
      if (!promoValue || promoValue <= 0) { setPromoError("Promo has no value."); return; }
      if (promoValue >= totalAmount) { setPromoError("Promo value cannot be equal to or greater than the total."); return; }
      if (totalAmount - promoValue < 50) { setPromoError("Payable would fall below ₹50."); return; }
      setDiscount(promoValue);
      setPromoApplied(true);
    } catch { setPromoError("Failed to verify promo code."); } finally { setLoading(false); }
  };

  const handlePayment = async () => {
    if (!totalAmount || totalAmount <= 0) { alert("Invalid total amount."); return; }
    if (payableAmount < 50) { alert("We do not process payments under ₹50."); return; }
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/stripe_payment/create-checkout-session`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ promocode: promoApplied ? promocode : "none" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || data.message || "Failed to create payment session");
      window.location.href = data.url;
    } catch (err) { alert(err.message || "Payment failed to start"); } finally { setLoading(false); }
  };

  const staggerVariants = { visible: { transition: { staggerChildren: 0.06 } } };
  const childVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#050810] overflow-hidden py-8">
      <div className="absolute top-[-100px] right-[-100px] w-[450px] h-[450px] rounded-full opacity-15 blur-[120px]" style={{ background: "#00d4ff", animation: "aurora 10s ease infinite" }} />
      <div className="absolute bottom-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full opacity-15 blur-[100px]" style={{ background: "#2dcc6f", animation: "aurora 12s ease infinite reverse" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-3xl mx-4 rounded-[28px] p-8 relative overflow-hidden"
        style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(24px) saturate(180%)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[80px]" style={{ background: "radial-gradient(circle, rgba(0,212,255,0.12), rgba(45,204,111,0.06))", animation: "pulseGlow 2s ease-in-out infinite alternate" }} />

        <motion.div variants={staggerVariants} initial="hidden" animate="visible">
          <motion.div variants={childVariants} className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full relative overflow-hidden mb-6" style={{ border: "1px solid rgba(0,212,255,0.3)", background: "rgba(0,212,255,0.08)", color: "#00d4ff" }}>
            <Sparkles size={14} />
            <span>Checkout</span>
          </motion.div>

          <motion.h1 variants={childVariants} className="text-4xl font-black tracking-tight text-white">Checkout</motion.h1>
          <motion.p variants={childVariants} className="text-sm mt-2 mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>Review your order</motion.p>

          <motion.div variants={childVariants} className="space-y-3 mb-6">
            {Object.entries(user).map(([key, val]) => (
              <div key={key} className="flex justify-between pb-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{key}:</span>
                <span className="text-sm text-white">{val || "-"}</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={childVariants} className="space-y-2 mb-6 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="flex justify-between text-sm">
              <span style={{ color: "rgba(255,255,255,0.5)" }}>Total:</span>
              <span className="text-white font-semibold">₹{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "rgba(255,255,255,0.5)" }}>Discount:</span>
              <span className="text-[#00ff88] font-semibold">- ₹{Number(discount || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <span className="text-white font-bold">Payable:</span>
              <span className="text-xl font-black" style={{ color: "#00d4ff" }}>₹{payableAmount.toFixed(2)}</span>
            </div>
          </motion.div>

          <motion.div variants={childVariants} className="mb-6">
            <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
              <Tag size={14} className="inline mr-1" />
              Promo Code
            </label>
            <div className="flex gap-3">
              <input type="text" value={promocode} onChange={(e) => { setPromocode(e.target.value.toUpperCase()); setPromoApplied(false); setPromoError(""); setDiscount(0); }}
                placeholder="Enter your promo code"
                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
              <motion.button onClick={handleApplyPromo} disabled={loading}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 rounded-xl font-semibold text-sm ${promoApplied ? "bg-[#2dcc6f]" : "bg-[#1376f4]"} text-white`}
              >
                {loading ? "..." : promoApplied ? "Applied" : "Apply"}
              </motion.button>
            </div>
            {promoError && <p className="text-red-500 text-xs mt-1">{promoError}</p>}
            {promoApplied && <p className="text-[#00ff88] text-xs mt-1">Promo applied! Discount: ₹{discount}</p>}
          </motion.div>

          <motion.button
            variants={childVariants}
            onClick={handlePayment} disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #00d4ff, #1376f4)", color: "#fff" }}
            whileHover={{ y: -2, boxShadow: "0 15px 30px rgba(0,212,255,0.35)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <CreditCard size={18} />
            {loading ? "Processing..." : `Pay ₹${payableAmount.toFixed(2)} with Stripe`}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Checkout;
