// src/pages/admin/ViewProducts.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiCall from "../../APIcall/APIcall"; // adjust path if needed

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // list of category names
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const image_url = import.meta.env.VITE_FRONT_URL || "";

  // Fetch products + categories
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiCall("/admin/get_all_products", "GET");
      // response expected shape: { categories: [...], products: [...] }
      setProducts(response.products || []);
      setCategories(response.categories || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (productid) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await apiCall(`/admin/delete_product/${productid}`, "DELETE");
      alert("🗑️ Product deleted successfully!");
      setProducts((prev) => prev.filter((p) => p.productid !== productid));
    } catch (err) {
      console.error(err);
      alert("Error deleting product!");
    }
  };

  // Open edit modal (exclude image editing)
  const openEdit = (product) => {
    setEditingProduct({
      productid: product.productid,
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      categoryname: product.categoryname || categories[0] || "",
    });
  };

  const closeEdit = () => setEditingProduct(null);

  const onEditChange = (field, value) =>
    setEditingProduct((prev) => ({ ...prev, [field]: value }));

  // Save updated product (PUT)
  const saveEdit = async () => {
    if (!editingProduct) return;
    const { productid, name, description, price, categoryname } =
      editingProduct;

    if (!name?.trim()) return alert("Name is required");
    if (price === "" || price === null || isNaN(Number(price)))
      return alert("Valid price is required");

    try {
      setSaving(true);
      const payload = {
        name: name.trim(),
        description: description || "",
        price: Number(price),
        categoryname: categoryname || "",
      };

      await apiCall(`/admin/update_product/${productid}`, "PUT", payload);

      // update local state
      setProducts((prev) =>
        prev.map((p) => (p.productid === productid ? { ...p, ...payload } : p))
      );

      alert("✅ Product updated successfully!");
      closeEdit();
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.detail || err.message || "Failed to update product";
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-green-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 font-semibold text-lg">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700 text-center flex-1">
          🛍️ All Products
        </h1>
        <button
          onClick={() => navigate("/productmanagement")}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md text-sm font-semibold transition-all duration-200"
        >
          ⬅️ Back
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No products available
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div
              key={product.productid}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-1"
            >
              <div className="w-full aspect-square overflow-hidden rounded-t-xl">
                <img
                  src={`${image_url}/products/${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {(product.description || "").slice(0, 50)}...
                </p>
                <p className="text-green-700 font-semibold mb-2">
                  ₹{product.price}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  Category:{" "}
                  <span className="font-medium text-gray-700">
                    {product.categoryname}
                  </span>
                </p>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => openEdit(product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product.productid)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Edit Product
            </h3>

            <div className="grid grid-cols-1 gap-3">
              <label className="text-sm font-medium">Name</label>
              <input
                value={editingProduct.name}
                onChange={(e) => onEditChange("name", e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />

              <label className="text-sm font-medium">Description</label>
              <textarea
                value={editingProduct.description}
                onChange={(e) => onEditChange("description", e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                rows={4}
              />

              <label className="text-sm font-medium">Price (INR)</label>
              <input
                value={editingProduct.price}
                onChange={(e) => onEditChange("price", e.target.value)}
                type="number"
                className="w-full px-4 py-2 border rounded-md"
              />

              <label className="text-sm font-medium">Category</label>
              <select
                value={editingProduct.categoryname}
                onChange={(e) => onEditChange("categoryname", e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              >
                {/* If categories list is empty, show current value as a fallback */}
                {categories && categories.length > 0 ? (
                  categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))
                ) : (
                  <option value={editingProduct.categoryname}>
                    {editingProduct.categoryname}
                  </option>
                )}
              </select>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={closeEdit}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                disabled={saving}
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
