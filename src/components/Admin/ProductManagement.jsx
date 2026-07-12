import React, { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Plus, Package, LogOut, ArrowRight, Sparkles } from "lucide-react";
import apiCall from "../../APIcall/APIcall";

const styles = `
@keyframes aurora {
  0% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(30px, -20px) scale(1.1); }
  50% { transform: translate(-20px, 30px) scale(0.9); }
  75% { transform: translate(20px, 20px) scale(1.05); }
  100% { transform: translate(-10px, -10px) scale(1); }
}
@keyframes float {
  0% { transform: translateY(-15px); }
  100% { transform: translateY(15px); }
}
@keyframes shimmer {
  0% { background-position: 0% 0%; }
  100% { background-position: 200% 0%; }
}
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
@keyframes pulseGlow {
  0% { box-shadow: 0 0 0 0 rgba(0,255,136,0.3); }
  100% { box-shadow: 0 0 20px 20px rgba(0,255,136,0.3); }
}
`;

function ProductPage() {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const [hover1, setHover1] = useState(false);
  const [hover3, setHover3] = useState(false);

  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 2,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 5,
    })),
  []);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) / (rect.width / 2);
    const offsetY = (e.clientY - centerY) / (rect.height / 2);
    rotateX.set(-offsetY * 6);
    rotateY.set(offsetX * 6);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleAddProduct = () => navigate("/adminaddproduct");
  const handleViewProducts = () => navigate("/view-products");
  const handleLogout = async () => {
    try {
      await apiCall("/login/logout", "POST");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      navigate("/login");
    }
  };

  const staggerVariants = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#050810] overflow-hidden">
      <style>{styles}</style>

      <div
        className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: "#00ff88",
          animation: "aurora 8s ease infinite",
        }}
      />
      <div
        className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: "#7c3aed",
          animation: "aurora 10s ease infinite reverse",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: "#00d4ff",
          animation: "aurora 12s ease infinite",
        }}
      />

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white opacity-30 pointer-events-none"
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
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div style={{ perspective: "1000px" }}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          className="w-full max-w-md mx-4 rounded-[28px] p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[80px]"
            style={{
              background:
                "radial-gradient(circle, rgba(0,255,136,0.2), rgba(0,212,255,0.1))",
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
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full relative overflow-hidden"
              style={{
                border: "1px solid rgba(0,255,136,0.3)",
                background: "rgba(0,255,136,0.08)",
                color: "#00ff88",
              }}
            >
              <Sparkles size={14} />
              <span>ESHOP Admin</span>
              <motion.div
                className="absolute inset-y-0 left-0 w-1/2"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "linear",
                }}
              />
            </motion.div>

            <motion.h1
              variants={childVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-5xl font-black tracking-tight mt-4"
              style={{
                background:
                  "linear-gradient(135deg, #00ff88 0%, #00d4ff 50%, #a855f7 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradientShift 4s ease infinite",
              }}
            >
              Product Management
            </motion.h1>

            <motion.p
              variants={childVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-sm mt-2"
              style={{
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.05em",
              }}
            >
              Manage your store inventory
            </motion.p>

            <motion.div
              variants={childVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full h-px my-6"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
              }}
            />

            <motion.button
              variants={childVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onHoverStart={() => setHover1(true)}
              onHoverEnd={() => setHover1(false)}
              onClick={handleAddProduct}
              className="w-full flex items-center gap-4 px-5 rounded-2xl h-16 font-bold text-[15px] text-[#001a0d] cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #00ff88, #00c46a)",
                boxShadow: "0 0 0 0 rgba(0,255,136,0.4)",
              }}
              whileHover={{
                y: -3,
                boxShadow: "0 20px 40px rgba(0,255,136,0.35)",
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="w-9 h-9 rounded-[10px] bg-black/20 flex items-center justify-center">
                <Plus size={18} />
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold">Add Product</div>
                <div className="text-xs opacity-70">Upload new item</div>
              </div>
              <motion.span
                animate={{ x: hover1 ? 4 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </motion.button>

            <motion.button
              variants={childVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={handleViewProducts}
              className="w-full flex items-center gap-4 px-5 rounded-2xl h-16 font-semibold text-[15px] text-white cursor-pointer mt-3"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(0,212,255,0.25)",
              }}
              whileHover={{
                y: -3,
                borderColor: "rgba(0,212,255,0.8)",
                boxShadow: "0 20px 40px rgba(0,212,255,0.2)",
                background: "rgba(0,212,255,0.08)",
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div
                className="w-9 h-9 rounded-[10px] flex items-center justify-center"
                style={{ background: "rgba(0,212,255,0.1)" }}
              >
                <Package size={18} color="#00d4ff" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold">View All Products</div>
                <div className="text-xs opacity-70">Browse catalogue</div>
              </div>
              <ArrowRight size={16} />
            </motion.button>

            <motion.button
              variants={childVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onHoverStart={() => setHover3(true)}
              onHoverEnd={() => setHover3(false)}
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm cursor-pointer rounded-xl mt-3"
              style={{ background: "transparent" }}
              animate={{
                color: hover3
                  ? "rgba(255,80,80,0.9)"
                  : "rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={{ x: hover3 ? [0, -3, 3, -3, 0] : 0 }}
                transition={{ duration: 0.4 }}
              >
                <LogOut size={16} />
              </motion.span>
              <span>Sign out</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductPage;
