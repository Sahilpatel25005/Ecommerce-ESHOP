import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Package, Pencil, Trash2 } from "lucide-react";
import apiCall from "../../APIcall/APIcall";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const image_url = import.meta.env.VITE_FRONT_URL || "";

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiCall("/admin/get_all_products", "GET");
      setProducts(response.products || []);
      setCategories(response.categories || []);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (productid) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await apiCall(`/admin/delete_product/${productid}`, "DELETE");
      setProducts((prev) => prev.filter((p) => p.productid !== productid));
    } catch (err) {
      alert("Error deleting product!");
    }
  };

  const openEdit = (product) => {
    setEditingProduct({
      productid: product.productid, name: product.name || "",
      description: product.description || "", price: product.price || "",
      categoryname: product.categoryname || categories[0] || "",
    });
  };

  const saveEdit = async () => {
    if (!editingProduct) return;
    const { productid, name, description, price, categoryname } = editingProduct;
    if (!name?.trim()) return alert("Name is required");
    if (price === "" || price === null || isNaN(Number(price))) return alert("Valid price is required");
    try {
      setSaving(true);
      await apiCall(`/admin/update_product/${productid}`, "PUT", {
        name: name.trim(), description: description || "", price: Number(price), categoryname: categoryname || "",
      });
      setProducts((prev) => prev.map((p) => (p.productid === productid ? { ...p, name: name.trim(), description: description || "", price: Number(price), categoryname: categoryname || "" } : p)));
      setEditingProduct(null);
    } catch (err) {
      alert(err?.response?.detail || err.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen bg-[#050810]"><div className="w-10 h-10 border-3 border-[#00ff88] border-t-transparent rounded-full animate-spin" /></div>;
  if (error) return <div className="flex justify-center items-center min-h-screen bg-[#050810] text-red-500 font-semibold">{error}</div>;

  return (
    <div className="min-h-screen bg-[#050810] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <motion.button
            onClick={() => navigate("/productmanagement")}
            className="flex items-center gap-2 text-sm font-semibold"
            style={{ color: "rgba(255,255,255,0.4)" }}
            whileHover={{ x: -3, color: "rgba(255,255,255,0.7)" }}
          >
            <ArrowLeft size={16} />
            Back
          </motion.button>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Package size={24} className="text-[#00ff88]" />
            All Products
          </h1>
          <div className="w-16" />
        </div>

        {products.length === 0 ? (
          <p className="text-center" style={{ color: "rgba(255,255,255,0.3)" }}>No products available</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {products.map((product) => (
              <motion.div
                key={product.productid}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="rounded-2xl overflow-hidden"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
              >
                <div className="w-full aspect-square overflow-hidden">
                  <motion.img whileHover={{ scale: 1.08 }} transition={{ duration: 0.4 }}
                    src={`${image_url}/products/${product.image}`} alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-white mb-1">{product.name}</h2>
                  <p className="text-sm mb-2 line-clamp-2" style={{ color: "rgba(255,255,255,0.5)" }}>{(product.description || "").slice(0, 80)}...</p>
                  <p className="text-[#00ff88] font-bold mb-1">₹{product.price}</p>
                  <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>{product.categoryname}</p>
                  <div className="flex gap-3">
                    <motion.button onClick={() => openEdit(product)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold"
                      style={{ background: "rgba(19,118,244,0.15)", color: "#1376f4", border: "1px solid rgba(19,118,244,0.2)" }}
                    >
                      <Pencil size={14} /> Edit
                    </motion.button>
                    <motion.button onClick={() => handleDelete(product.productid)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold"
                      style={{ background: "rgba(244,44,55,0.15)", color: "#f42c37", border: "1px solid rgba(244,44,55,0.2)" }}
                    >
                      <Trash2 size={14} /> Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {editingProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.6)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg rounded-2xl p-6"
              style={{ background: "rgba(20,25,35,0.95)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Edit Product</h3>
              <div className="space-y-3">
                {["name", "description", "price"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    {field === "description" ? (
                      <textarea value={editingProduct[field]} onChange={(e) => setEditingProduct((p) => ({ ...p, [field]: e.target.value }))} rows={3}
                        className="w-full px-4 py-2 rounded-xl text-sm text-white outline-none"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                      />
                    ) : (
                      <input type={field === "price" ? "number" : "text"} value={editingProduct[field]} onChange={(e) => setEditingProduct((p) => ({ ...p, [field]: e.target.value }))}
                        className="w-full px-4 py-2 rounded-xl text-sm text-white outline-none"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                      />
                    )}
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>Category</label>
                  <select value={editingProduct.categoryname} onChange={(e) => setEditingProduct((p) => ({ ...p, categoryname: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl text-sm text-white outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    {(categories.length > 0 ? categories : [editingProduct.categoryname]).map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <motion.button onClick={() => setEditingProduct(null)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="px-5 py-2 rounded-xl text-sm font-semibold"
                  style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)" }}
                >
                  Cancel
                </motion.button>
                <motion.button onClick={saveEdit} disabled={saving} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="px-5 py-2 rounded-xl text-sm font-semibold"
                  style={{ background: "linear-gradient(135deg, #00ff88, #00c46a)", color: "#001a0d" }}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewProducts;
