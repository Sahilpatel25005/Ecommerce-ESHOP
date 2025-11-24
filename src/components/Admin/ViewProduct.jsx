import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiCall from "../../APIcall/APIcall"; // your existing API call function

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const image_url = import.meta.env.VITE_FRONT_URL;

  // ✅ Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await apiCall("/admin/get_all_products", "GET");
      setProducts(response.products || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete product
  const handleDelete = async (productid) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const response = await apiCall(
        `/admin/delete_product/${productid}`,
        "DELETE"
      );
      if (response.message) {
        alert("🗑️ Product deleted successfully!");
        setProducts((prev) => prev.filter((p) => p.productid !== productid));
      } else {
        alert("Failed to delete product!");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting product!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
      {/* ✅ Back Button */}
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
              <img
                src={`${image_url}/products/${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {product.description.slice(0, 50)}...
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

                <button
                  onClick={() => handleDelete(product.productid)}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
