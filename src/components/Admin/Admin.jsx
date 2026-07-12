import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Shield, Eye, EyeOff } from "lucide-react";
import apiCall from "../../APIcall/APIcall";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const particles = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i, top: Math.random() * 100, left: Math.random() * 100,
      size: Math.random() * 2 + 2, duration: Math.random() * 5 + 3, delay: Math.random() * 5,
    })),
  []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setLoginError("");
    setLoading(true);

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const res = await apiCall("/admin", "POST", { email, password });
      if (res.error) {
        setLoginError(res.error);
      } else {
        navigate("/productmanagement");
      }
    } catch (error) {
      if (error.message?.toLowerCase().includes("expired")) {
        setLoginError("Your session has expired. Please log in again.");
        navigate("/login");
      } else {
        setLoginError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const staggerVariants = { visible: { transition: { staggerChildren: 0.08 } } };
  const childVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#050810] overflow-hidden">
      <div className="absolute top-[-120px] right-[-120px] w-[550px] h-[550px] rounded-full opacity-15 blur-[140px]" style={{ background: "#1376f4", animation: "aurora 10s ease infinite" }} />
      <div className="absolute bottom-[-80px] left-[-80px] w-[380px] h-[380px] rounded-full opacity-15 blur-[110px]" style={{ background: "#7c3aed", animation: "aurora 12s ease infinite reverse" }} />

      {particles.map((p) => (
        <div key={p.id} className="absolute rounded-full bg-white opacity-15 pointer-events-none" style={{ top: `${p.top}%`, left: `${p.left}%`, width: `${p.size}px`, height: `${p.size}px`, animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite alternate` }} />
      ))}

      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md mx-4 rounded-[28px] p-8 relative overflow-hidden"
        style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(24px) saturate(180%)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[80px]" style={{ background: "radial-gradient(circle, rgba(19,118,244,0.15), rgba(124,58,237,0.08))", animation: "pulseGlow 2s ease-in-out infinite alternate" }} />

        <motion.div variants={staggerVariants} initial="hidden" animate="visible">
          <motion.div variants={childVariants} className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full relative overflow-hidden mb-6" style={{ border: "1px solid rgba(19,118,244,0.3)", background: "rgba(19,118,244,0.08)", color: "#1376f4" }}>
            <Shield size={14} />
            <span>Admin Access</span>
            <motion.div className="absolute inset-y-0 left-0 w-1/3" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} animate={{ x: ["-100%", "300%"] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }} />
          </motion.div>

          <motion.h1 variants={childVariants} className="text-4xl font-black tracking-tight text-white">Admin Login</motion.h1>
          <motion.p variants={childVariants} className="text-sm mt-2 mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>Secure admin portal</motion.p>

          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mb-4">
              <div className="w-8 h-8 border-3 border-[#1376f4] border-t-transparent rounded-full animate-spin" />
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div variants={childVariants}>
              <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={(e) => e.target.style.borderColor = "rgba(19,118,244,0.5)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </motion.div>

            <motion.div variants={childVariants}>
              <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="w-full px-4 py-3 pr-12 rounded-xl text-sm text-white outline-none transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(19,118,244,0.5)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

            {loginError && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm text-center">{loginError}</motion.p>
            )}

            <motion.button
              variants={childVariants}
              type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm cursor-pointer"
              style={{ background: "linear-gradient(135deg, #1376f4, #0f5bc4)", color: "#fff" }}
              whileHover={{ y: -2, boxShadow: "0 15px 30px rgba(19,118,244,0.35)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Shield size={18} />
              {loading ? "Authenticating..." : "Access Dashboard"}
            </motion.button>
          </form>

          <motion.div variants={childVariants} className="mt-6 text-center">
            <button onClick={() => navigate("/login")} className="text-xs font-semibold hover:underline" style={{ color: "rgba(255,255,255,0.3)" }}>
              Back to User Login
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
