import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, UserPlus, ArrowLeft } from "lucide-react";
import apiCall from "../../APIcall/APIcall";

const Registration = () => {
  const [form, setForm] = useState({
    firstName: "", lastName: "", phoneNumber: "",
    email: "", password: "", address: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const particles = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 2,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 5,
    })),
  []);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.firstName) errs.firstName = "Required";
    if (!form.lastName) errs.lastName = "Required";
    if (!form.phoneNumber) errs.phoneNumber = "Required";
    else if (!/^[0-9]{10}$/.test(form.phoneNumber)) errs.phoneNumber = "Invalid phone";
    if (!form.email) errs.email = "Required";
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) errs.email = "Invalid email";
    if (!form.password) errs.password = "Required";
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:<>?.,]).{8,}$/.test(form.password))
      errs.password = "8+ chars, upper, lower, number & special";
    if (!form.address) errs.address = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await apiCall("/register", "POST", {
        fname: form.firstName,
        lname: form.lastName,
        email: form.email,
        monumber: form.phoneNumber,
        password: form.password,
        address: form.address,
      });
      if (response.error) throw new Error(response.error);
      if (!response.message) throw new Error("Registration failed");
      alert(response.message);
      navigate("/login");
    } catch (error) {
      setErrors((prev) => ({ ...prev, apiError: error.message }));
    } finally {
      setLoading(false);
    }
  };

  const staggerVariants = { visible: { transition: { staggerChildren: 0.06 } } };
  const childVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#050810] overflow-hidden py-8">
      <div className="absolute top-[-120px] right-[-120px] w-[500px] h-[500px] rounded-full opacity-15 blur-[130px]" style={{ background: "#2dcc6f", animation: "aurora 10s ease infinite" }} />
      <div className="absolute bottom-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full opacity-15 blur-[100px]" style={{ background: "#1376f4", animation: "aurora 12s ease infinite reverse" }} />

      {particles.map((p) => (
        <div key={p.id} className="absolute rounded-full bg-white opacity-15 pointer-events-none" style={{ top: `${p.top}%`, left: `${p.left}%`, width: `${p.size}px`, height: `${p.size}px`, animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite alternate` }} />
      ))}

      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg mx-4 rounded-[28px] p-8 relative overflow-hidden"
        style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(24px) saturate(180%)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[80px]" style={{ background: "radial-gradient(circle, rgba(45,204,111,0.15), rgba(19,118,244,0.08))", animation: "pulseGlow 2s ease-in-out infinite alternate" }} />

        <motion.div variants={staggerVariants} initial="hidden" animate="visible">
          <motion.div variants={childVariants} className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full relative overflow-hidden mb-6" style={{ border: "1px solid rgba(45,204,111,0.3)", background: "rgba(45,204,111,0.08)", color: "#2dcc6f" }}>
            <Sparkles size={14} />
            <span>Create Account</span>
            <motion.div className="absolute inset-y-0 left-0 w-1/3" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} animate={{ x: ["-100%", "300%"] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }} />
          </motion.div>

          <motion.h1 variants={childVariants} className="text-4xl font-black tracking-tight text-white">Register</motion.h1>
          <motion.p variants={childVariants} className="text-sm mt-2 mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>Create your account</motion.p>

          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mb-4">
              <div className="w-8 h-8 border-3 border-[#2dcc6f] border-t-transparent rounded-full animate-spin" />
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {["firstName", "lastName"].map((field) => (
                <motion.div key={field} variants={childVariants}>
                  <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {field === "firstName" ? "First Name" : "Last Name"}
                  </label>
                  <input type="text" value={form[field]} onChange={set(field)} style={inputStyle} className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:border-[#2dcc6f]/50" />
                  {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                </motion.div>
              ))}
            </div>

            {["email", "phoneNumber", "password", "address"].map((field) => (
              <motion.div key={field} variants={childVariants}>
                <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {field === "phoneNumber" ? "Phone Number" : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {field === "address" ? (
                  <textarea value={form[field]} onChange={set(field)} rows={2} style={inputStyle} className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:border-[#2dcc6f]/50" />
                ) : (
                  <input
                    type={field === "password" ? "password" : field === "email" ? "email" : field === "phoneNumber" ? "number" : "text"}
                    value={form[field]} onChange={field === "phoneNumber" ? (e) => { e.target.value = e.target.value.slice(0, 10); setForm(prev => ({ ...prev, phoneNumber: e.target.value })); } : set(field)}
                    style={inputStyle}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:border-[#2dcc6f]/50"
                  />
                )}
                {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
              </motion.div>
            ))}

            {errors.apiError && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm text-center">{errors.apiError}</motion.p>
            )}

            <motion.button
              variants={childVariants}
              type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm cursor-pointer"
              style={{ background: "linear-gradient(135deg, #2dcc6f, #1fa855)", color: "#fff" }}
              whileHover={{ y: -2, boxShadow: "0 15px 30px rgba(45,204,111,0.35)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <UserPlus size={18} />
              {loading ? "Registering..." : "Create Account"}
            </motion.button>
          </form>

          <motion.div variants={childVariants} className="mt-6 text-center">
            <Link to="/login" className="inline-flex items-center gap-1 text-xs font-semibold hover:underline" style={{ color: "rgba(255,255,255,0.4)" }}>
              <ArrowLeft size={14} />
              Back to Sign In
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Registration;
