import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Mail, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i, top: Math.random() * 100, left: Math.random() * 100,
      size: Math.random() * 2 + 2, duration: Math.random() * 5 + 3, delay: Math.random() * 5,
    })),
  []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const staggerVariants = { visible: { transition: { staggerChildren: 0.08 } } };
  const childVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#050810] overflow-hidden">
      <div className="absolute top-[-100px] right-[-100px] w-[450px] h-[450px] rounded-full opacity-15 blur-[120px]" style={{ background: "#fdc62e", animation: "aurora 10s ease infinite" }} />
      <div className="absolute bottom-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full opacity-15 blur-[100px]" style={{ background: "#f42c37", animation: "aurora 12s ease infinite reverse" }} />

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
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[80px]" style={{ background: "radial-gradient(circle, rgba(253,198,46,0.12), rgba(244,44,55,0.06))", animation: "pulseGlow 2s ease-in-out infinite alternate" }} />

        <motion.div variants={staggerVariants} initial="hidden" animate="visible">
          <motion.div variants={childVariants} className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full relative overflow-hidden mb-6" style={{ border: "1px solid rgba(253,198,46,0.3)", background: "rgba(253,198,46,0.08)", color: "#fdc62e" }}>
            <Sparkles size={14} />
            <span>Reset Password</span>
            <motion.div className="absolute inset-y-0 left-0 w-1/3" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} animate={{ x: ["-100%", "300%"] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }} />
          </motion.div>

          <motion.h1 variants={childVariants} className="text-4xl font-black tracking-tight text-white">Forgot Password?</motion.h1>
          <motion.p variants={childVariants} className="text-sm mt-2 mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>Enter your email to receive a reset link</motion.p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div variants={childVariants}>
              <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={(e) => e.target.style.borderColor = "rgba(253,198,46,0.5)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
            </motion.div>

            <motion.button
              variants={childVariants}
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm cursor-pointer"
              style={{ background: "linear-gradient(135deg, #fdc62e, #e0aF20)", color: "#050810" }}
              whileHover={{ y: -2, boxShadow: "0 15px 30px rgba(253,198,46,0.35)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Mail size={18} />
              Send Reset Link
            </motion.button>
          </form>

          <motion.div variants={childVariants} className="mt-6 text-center">
            <Link to="/login" className="inline-flex items-center gap-1 text-xs font-semibold hover:underline" style={{ color: "rgba(255,255,255,0.3)" }}>
              <ArrowLeft size={14} />
              Back to Sign In
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
