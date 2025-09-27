import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiCall from "../../APIcall/APIcall";
import { useDispatch } from "react-redux";
import { generate_product_details } from "../Slice/ProductDetailsGenerate";

const AdminAddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const [preview, setPreview] = useState(null); // <-- Add this state

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProduct({ ...product, image: file.name });
    setPreview(URL.createObjectURL(file)); // <-- Set preview URL
    setLoading(true);
    setErrors({});

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await apiCall(
        "/generate-product",
        "POST",
        formData,
        true
      );

      if (response?.title || response?.description) {
        setProduct((prev) => ({
          ...prev,
          name: response.title || prev.name,
          description: response.description || prev.description,
        }));
      }
    } catch (error) { 
      console.error("Error generating details:", error);
      setErrors({ apiError: "Failed to generate product details" });
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const errors = {};
    if (!product.name) errors.name = "Title is required";
    if (!product.price || product.price <= 0)
      errors.price = "Price must be greater than zero";
    if (!product.image) errors.image = "Product image is required";
    if (!product.description) errors.description = "Description is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await apiCall("/admin_add_product", "POST", product);
      if (!response.message) throw new Error(JSON.stringify(response));

      alert("Product added successfully!");
      setProduct({ name: "", price: "", image: "", description: "" });
    } catch (error) {
      let errorMessage = error.message;
      try {
        const errObj = JSON.parse(error.message);
        errorMessage = errObj.message || JSON.stringify(errObj);
      } catch (e) {}
      setErrors({ apiError: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg relative">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded"
      >
        Logout
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>

      {loading && (
        <div className="flex justify-center mb-4">
          <div className="w-9 h-9 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            disabled={loading}
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image}</p>
          )}

          {/* Image preview */}
          {preview && (
            <img
              src={preview}
              alt="Selected"
              className="mt-2 w-32 h-32 object-cover border rounded"
            />
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
            disabled={loading} // disable while loading
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
            disabled={loading} // disable while loading
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
            disabled={loading} // disable while loading
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}
        </div>

        {/* API Error */}
        {errors.apiError && (
          <p className="text-red-500 text-sm">{errors.apiError}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
          disabled={loading} // disable while loading
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
