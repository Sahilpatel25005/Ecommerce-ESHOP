import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiCall from "../../APIcall/APIcall";

const AdminAddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });
  const [file, setFile] = useState(null); // store selected file
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Fetch categories on mount (if needed)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiCall("/admin/get_categories", "GET");
        if (res.categories) setCategories(res.categories);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle image selection + AI generate-product API
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

      const response = await apiCall(
        "/generate-product",
        "POST",
        formData,
        true
      );

      // --- CATEGORY IS MANDATORY ---
      if (!response.categories || response.categories.length === 0) {
        throw new Error("Category data missing from API");
      }

      // Set categories (MANDATORY)
      setCategories(response.categories);

      // --- PRODUCT DATA OPTIONAL ---
      if (response.product_data?.product_title || response.product_data?.product_description) {
        setProduct((prev) => ({
          ...prev,
          name: response.product_data.product_title || prev.name,
          description: response.product_data.product_description || prev.description,
          category: response.product_data.category || prev.category,
        }));
      }
    } catch (error) {
      console.error("Error generating product details:", error);
      setErrors({
        apiError: error.message || "Failed to generate product details",
      });
    } finally {
      setLoading(false);
    }
  };

  // Validate form before submission
  const validate = () => {
    const errs = {};
    if (!product.name) errs.name = "Title is required";
    if (!product.price || product.price <= 0)
      errs.price = "Price must be greater than zero";
    if (!file) errs.image = "Product image is required";
    if (!product.description) errs.description = "Description is required";
    if (!product.category) errs.category = "Category is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit form to backend
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

      const response = await apiCall(
        "/admin_add_product",
        "POST",
        formData,
        true
      );
      if (!response.message) throw new Error(JSON.stringify(response));

      alert("✅ Product added successfully!");

      // Reset form
      setProduct({ name: "", price: "", description: "", category: "" });
      setFile(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setErrors({});
    } catch (err) {
      let msg = err.message;
      try {
        const obj = JSON.parse(err.message);
        msg = obj.message || JSON.stringify(obj);
      } catch {}
      setErrors({ apiError: msg });
    } finally {
      setLoading(false);
    }
  };

  // Back button handler
  const handleBack = () => navigate("/productmanagement");

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg relative">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1 rounded-lg font-semibold transition-all duration-200"
      >
        ⬅ Back
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>

      {loading && (
        <div className="flex justify-center mb-4">
          <div className="w-9 h-9 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            disabled={loading}
            ref={fileInputRef}
          />
          {preview && (
            <img
              src={preview}
              alt="Selected"
              className="mt-2 w-32 h-32 object-cover border rounded"
            />
          )}
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image}</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Title"
            className="w-full p-2 border rounded"
            disabled={loading}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="w-full p-2 border rounded"
            disabled={loading}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 border rounded"
            disabled={loading}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            disabled={loading || categories.length === 0}
          >
            <option value="">Select Category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>

        {/* API Error */}
        {errors.apiError && (
          <p className="text-red-500 text-sm">{errors.apiError}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-all duration-200"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
