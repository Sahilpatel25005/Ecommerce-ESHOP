import React from "react";
import { useNavigate } from "react-router-dom";


const ProductPage = () => {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    window.location.href = "/adminaddproduct";
  };

  const handleViewProducts = () => {
    window.location.href = "/view-products";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-11/12 max-w-md text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-3xl">
        <h1 className="text-3xl font-bold text-green-700 mb-8">
          Product Management
        </h1>

        <div className="flex flex-col gap-6">
          <button
            onClick={handleAddProduct}
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl text-lg font-semibold shadow-md transition-transform duration-300 hover:scale-105"
          >
            ➕ Add Product
          </button>

          <button
            onClick={handleViewProducts}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl text-lg font-semibold shadow-md transition-transform duration-300 hover:scale-105"
          >
            📦 View All Products
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl text-lg font-semibold shadow-md transition-transform duration-300 hover:scale-105"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
