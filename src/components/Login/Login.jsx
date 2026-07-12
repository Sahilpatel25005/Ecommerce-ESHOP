import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Eye, EyeOff, LogIn } from "lucide-react";
import apiCall from "../../APIcall/APIcall";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 2,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 5,
    })),
  []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setLoginError("");
    setLoading(true);

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    const data = { email, password };

    try {
      const res = await apiCall("/login/", "POST", data);

      if (res?.error) {
        setLoginError(res.error);
        setLoading(false);
        return;
      }

      try {
        const me = await apiCall("/login/me", "GET");
        navigate("/Home");
      } catch (meErr) {
        console.error("Failed to fetch user after login:", meErr);
        setLoginError("Login succeeded but failed to fetch user details.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const staggerVariants = {
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#050810] overflow-hidden">
      <div
        className="absolute top-[-150px] right-[-150px] w-[600px] h-[600px] rounded-full opacity-15 blur-[150px]"
        style={{
          background: "#f42c37",
          animation: "aurora 10s ease infinite",
        }}
      />
      <div
        className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full opacity-15 blur-[120px]"
        style={{
          background: "#1376f4",
          animation: "aurora 12s ease infinite reverse",
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full opacity-10 blur-[100px]"
        style={{
          background: "#2dcc6f",
          animation: "aurora 8s ease infinite",
        }}
      />

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white opacity-20 pointer-events-none"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md mx-4 rounded-[28px] p-8 relative overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[80px]"
          style={{
            background: "radial-gradient(circle, rgba(244,44,55,0.15), rgba(19,118,244,0.08))",
            animation: "pulseGlow 2s ease-in-out infinite alternate",
          }}
        />

        <motion.div
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={childVariants}
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full relative overflow-hidden mb-6"
            style={{
              border: "1px solid rgba(244,44,55,0.3)",
              background: "rgba(244,44,55,0.08)",
              color: "#f42c37",
            }}
          >
            <Sparkles size={14} />
            <span>Welcome Back</span>
            <motion.div
              className="absolute inset-y-0 left-0 w-1/3"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
              }}
              animate={{ x: ["-100%", "300%"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            />
          </motion.div>

          <motion.h1
            variants={childVariants}
            className="text-4xl font-black tracking-tight text-white"
          >
            Sign In
          </motion.h1>
          <motion.p
            variants={childVariants}
            className="text-sm mt-2 mb-8"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Access your account
          </motion.p>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mb-4"
            >
              <div className="w-8 h-8 border-3 border-[#f42c37] border-t-transparent rounded-full animate-spin" />
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div variants={childVariants}>
              <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onFocus={(e) => e.target.style.borderColor = "rgba(244,44,55,0.5)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </motion.div>

            <motion.div variants={childVariants}>
              <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl text-sm text-white outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(244,44,55,0.5)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

            <motion.div variants={childVariants} className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-xs hover:underline"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Forgot password?
              </Link>
            </motion.div>

            {loginError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm text-center"
              >
                {loginError}
              </motion.p>
            )}

            <motion.button
              variants={childVariants}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #f42c37, #d41a24)",
                color: "#fff",
              }}
              whileHover={{ y: -2, boxShadow: "0 15px 30px rgba(244,44,55,0.35)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <LogIn size={18} />
              {loading ? "Signing in..." : "Sign In"}
            </motion.button>
          </form>

          <motion.div variants={childVariants} className="mt-6 text-center space-y-2">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              Don&apos;t have an account?{" "}
              <Link to="/register" className="font-semibold hover:underline" style={{ color: "#f42c37" }}>
                Sign up
              </Link>
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              Admin?{" "}
              <Link to="/admin" className="font-semibold hover:underline" style={{ color: "#1376f4" }}>
                Admin Login
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
