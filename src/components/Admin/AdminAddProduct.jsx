import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Sparkles } from "lucide-react";
import apiCall from "../../APIcall/APIcall";

const AdminAddProduct = () => {
  const [product, setProduct] = useState({ name: "", price: "", description: "", category: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setLoading(true);
    setErrors({});
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      const response = await apiCall("/generate-product", "POST", formData, true);
      if (!response.categories || response.categories.length === 0) throw new Error("Category data missing from API");
      setCategories(response.categories);
      if (response.product_data?.product_title || response.product_data?.product_description) {
        setProduct((prev) => ({
          ...prev,
          name: response.product_data.product_title || prev.name,
          description: response.product_data.product_description || prev.description,
          category: response.product_data.category || prev.category,
        }));
      }
    } catch (error) {
      setErrors({ apiError: error.message || "Failed to generate product details" });
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const errs = {};
    if (!product.name) errs.name = "Title is required";
    if (!product.price || product.price <= 0) errs.price = "Price must be greater than zero";
    if (!file) errs.image = "Product image is required";
    if (!product.description) errs.description = "Description is required";
    if (!product.category) errs.category = "Category is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("image", file);
      const response = await apiCall("/admin_add_product", "POST", formData, true);
      if (!response.message) throw new Error(JSON.stringify(response));
      alert("Product added successfully!");
      setProduct({ name: "", price: "", description: "", category: "" });
      setFile(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setErrors({});
    } catch (err) {
      let msg = err.message;
      try { const obj = JSON.parse(err.message); msg = obj.message || JSON.stringify(obj); } catch {}
      setErrors({ apiError: msg });
    } finally {
      setLoading(false);
    }
  };

  const staggerVariants = { visible: { transition: { staggerChildren: 0.06 } } };
  const childVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
  const inputStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#050810] overflow-hidden py-8">
      <div className="absolute top-[-100px] right-[-100px] w-[450px] h-[450px] rounded-full opacity-15 blur-[120px]" style={{ background: "#00ff88", animation: "aurora 10s ease infinite" }} />
      <div className="absolute bottom-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full opacity-15 blur-[100px]" style={{ background: "#1376f4", animation: "aurora 12s ease infinite reverse" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg mx-4 rounded-[28px] p-8 relative overflow-hidden"
        style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(24px) saturate(180%)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[80px]" style={{ background: "radial-gradient(circle, rgba(0,255,136,0.12), rgba(19,118,244,0.06))", animation: "pulseGlow 2s ease-in-out infinite alternate" }} />

        <motion.button
          onClick={() => navigate("/productmanagement")}
          className="flex items-center gap-1 text-xs font-semibold mb-6 hover:underline"
          style={{ color: "rgba(255,255,255,0.4)" }}
          whileHover={{ x: -3 }}
        >
          <ArrowLeft size={14} />
          Back
        </motion.button>

        <motion.div variants={staggerVariants} initial="hidden" animate="visible">
          <motion.div variants={childVariants} className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full relative overflow-hidden mb-6" style={{ border: "1px solid rgba(0,255,136,0.3)", background: "rgba(0,255,136,0.08)", color: "#00ff88" }}>
            <Sparkles size={14} />
            <span>Add Product</span>
          </motion.div>

          <motion.h1 variants={childVariants} className="text-4xl font-black tracking-tight text-white">New Product</motion.h1>
          <motion.p variants={childVariants} className="text-sm mt-2 mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>Upload product details</motion.p>

          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mb-4">
              <div className="w-8 h-8 border-3 border-[#00ff88] border-t-transparent rounded-full animate-spin" />
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div variants={childVariants}>
              <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Product Image</label>
              <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} disabled={loading}
                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
              {preview && <img src={preview} alt="" className="mt-2 w-24 h-24 object-cover rounded-xl" />}
              {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
            </motion.div>

            {["name", "description", "price"].map((field) => (
              <motion.div key={field} variants={childVariants}>
                <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {field === "description" ? (
                  <textarea name={field} value={product[field]} onChange={handleChange} rows={2} style={inputStyle}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:border-[#00ff88]/50"
                  />
                ) : (
                  <input type={field === "price" ? "number" : "text"} name={field} value={product[field]} onChange={handleChange} style={inputStyle}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:border-[#00ff88]/50"
                  />
                )}
                {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
              </motion.div>
            ))}

            <motion.div variants={childVariants}>
              <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Category</label>
              <select name="category" value={product.category} onChange={handleChange} disabled={loading || categories.length === 0} style={inputStyle}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:border-[#00ff88]/50"
              >
                <option value="">Select Category</option>
                {categories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </motion.div>

            {errors.apiError && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm">{errors.apiError}</motion.p>}

            <motion.button
              variants={childVariants}
              type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm cursor-pointer"
              style={{ background: "linear-gradient(135deg, #00ff88, #00c46a)", color: "#001a0d" }}
              whileHover={{ y: -2, boxShadow: "0 15px 30px rgba(0,255,136,0.35)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Plus size={18} />
              {loading ? "Adding..." : "Add Product"}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminAddProduct;
